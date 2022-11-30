import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { TRPCError } from '@trpc/server'
import {getHTTPStatusCodeFromError } from '@trpc/server/http'

interface ErrObj {httpCode?: number; error?: TRPCError}

export function routeErrorHandler(
  err: unknown,
  code: TRPCError['code'],
  message: string,
) {
  const errObj: ErrObj = {httpCode: undefined, error: undefined}

  if(err instanceof PrismaClientKnownRequestError) {
    if(err.code === 'P2002') {
      errObj.error = new TRPCError({ code, message })
    }
  }

  if(err instanceof TRPCError) {
    const httpCode = getHTTPStatusCodeFromError(err)
    return {httpCode: httpCode, errObj: new TRPCError({code, message})}
  }
}
