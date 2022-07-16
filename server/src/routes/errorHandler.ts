import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import * as trpc from '@trpc/server'
import { TRPCError } from '@trpc/server'


  
  export function routeErrorHandler(
    err: unknown, 
    code: TRPCError['code'], 
    message: string
  ) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        return new trpc.TRPCError({
          code,
          message,
        })
      }
    }

    return new trpc.TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Do you smell smoke?',
    })
  };