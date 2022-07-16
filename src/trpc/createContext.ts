import * as trpcExpress from '@trpc/server/adapters/express';
import * as trpc from '@trpc/server';
import { Request } from 'express';

export interface CtxUser {
  id: string
  email: string
  name: string
  iat: string
  exp: number
}


const getUserFromReq = (req: Request) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (token) {
    try {
      const verified = verifyJwt<CtxUser>(token)
      return verified
    }
    catch (e) {
      return null
    }
  }

  return null
}

export function createContext({
  req,
  res
}: trpcExpress.CreateExpressContextOptions) {

  const user = getUserFromReq(req)

  return {
    req,
    res,
    prisma,
    user,
  };
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>