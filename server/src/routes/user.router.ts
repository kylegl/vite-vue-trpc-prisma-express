import { serialize } from 'cookie'
import * as trpc from '@trpc/server'


export const userRouter = createRouter()
  .mutation('register-user', {
    input: createUserSchema,

    async resolve({ ctx, input }) {
      const { email, name } = input

      try {
        const user = await ctx.prisma.user.create({
          data: {
            email,
            name,
          },
        })

        return user
      }
      catch (err) {
        const error = routeErrorHandler(err, 'CONFLICT', 'User already exists')
        throw error
      }
    },
  })
  .mutation('request-otp', {
    input: requestOtpSchema,
    async resolve({ ctx, input }) {
      const { email, redirect } = input
      const user = await ctx.prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (!user) {
        throw new trpc.TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found',
        })
      }

      const token = await ctx.prisma.loginToken.create({
        data: {
          redirect,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      })

      // send email to user
      await sendLoginEmail({
        email: user.email,
        url: baseUrl,
        token: encode(`${token.id}:${user.email}`),
      })

      return true
    },
  })
  .query('verify-otp', {
    input: verifyOtpSchema,
    async resolve({ ctx, input }) {
      const decoded = decode(input.hash)
      const [id, email] = decoded.split(':')

      const token = await ctx.prisma.loginToken.findFirst({
        where: {
          id,
          user: {
            email,
          },
        },
        include: {
          user: true,
        },
      })

      if (!token) {
        throw new trpc.TRPCError({
          code: 'FORBIDDEN',
          message: 'Invalid token',
        })
      }

      const jwt = signJwt({
        email: token.user.email,
        id: token.user.id,
      })

      ctx.res.setHeader('Set-Cookie', serialize('token', jwt, { path: '/' }))

      return {
        redirect: token.redirect,
      }
    },
  })
  .query('me', {
    resolve({ ctx }) {
      return ctx.user
    },
  })


  .query('get-users', {
    resolve: async ({ ctx }) => {
      const users = await ctx.prisma.user.findMany()

      return users
    }
  })