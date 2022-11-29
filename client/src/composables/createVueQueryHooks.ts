import type { UseMutationOptions, UseMutationReturnType, UseQueryOptions, UseQueryReturnType } from 'vue-query'
import { useMutation as __useMutation, useQuery as __useQuery } from 'vue-query'

import type {
  CreateTRPCClientOptions,
  TRPCClient,
  TRPCClientErrorLike,
  TRPCRequestOptions,
} from '@trpc/client'
import {
  createTRPCClient,
} from '@trpc/client'
import type {
  AnyRouter,
  ProcedureRecord,
  inferHandlerInput,
  inferProcedureInput,
  inferProcedureOutput,
} from '@trpc/server'

export interface TRPCUseQueryBaseOptions extends TRPCRequestOptions {
  /**
   * Opt out of SSR for this query by passing `ssr: false`
   */
  ssr?: boolean
}

export interface UseTRPCQueryOptions<TPath, TInput, TOutput, TData, TError>
  extends UseQueryOptions<TOutput, TError, TData, [TPath, TInput]>,
  TRPCUseQueryBaseOptions {}

type inferProcedures<
  TObj extends ProcedureRecord<any, any, any, any, any, any>,
> = {
  [TPath in keyof TObj]: {
    input: inferProcedureInput<TObj[TPath]>
    output: inferProcedureOutput<TObj[TPath]>
  };
}

// type TQueryValues = inferProcedures<AnyRouter['_def']['queries']>

// type TQueries = AnyRouter['_def']['queries']

export interface UseTRPCMutationOptions<
  TInput,
  TError,
  TOutput,
  TContext = unknown,
> extends UseMutationOptions<TOutput, TError, TInput, TContext>,
  TRPCUseQueryBaseOptions {}

// type TError = TRPCClientErrorLike<AnyRouter>

// type TMutationValues = inferProcedures<AnyRouter['_def']['mutations']>

function getClientArgs<TPathAndInput extends unknown[], TOptions>(
  pathAndInput: TPathAndInput,
  opts: TOptions,
) {
  const [path, input] = pathAndInput
  return [path, input, opts] as const
}

export function createVueQueryHooks<
  TRouter extends AnyRouter,
>() {
  type TQueries = TRouter['_def']['queries']
  // type TSubscriptions = TRouter['_def']['subscriptions']
  type TError = TRPCClientErrorLike<TRouter>
  // type TInfiniteQueryNames = inferInfiniteQueryNames<TQueries>

  type TQueryValues = inferProcedures<TRouter['_def']['queries']>
  type TMutationValues = inferProcedures<TRouter['_def']['mutations']>

  // type ProviderContext = TRPCContextState<TRouter, TSSRContext>
  // const Context = TRPCContext as React.Context<ProviderContext>

  function useQuery<
    TPath extends keyof TQueryValues & string,
    TQueryFnData = TQueryValues[TPath]['output'],
    TData = TQueryValues[TPath]['output'],
  >(
    pathAndInput: [path: TPath, ...args: inferHandlerInput<TQueries[TPath]>],
    opts?: UseTRPCQueryOptions<
      TPath,
      TQueryValues[TPath]['input'],
      TQueryFnData,
      TData,
      TError
      >,
  ): UseQueryReturnType<TData, TError> {
    return __useQuery(
      pathAndInput as any,
      () => ((client as any).query(...getClientArgs(pathAndInput, opts))),
      opts,
    )
  }

  function useMutation<
  TPath extends keyof TMutationValues & string,
  TContext = unknown,
  >(
    path: TPath | [TPath],
    opts?: UseTRPCMutationOptions<
    TMutationValues[TPath]['input'],
    TError,
    TMutationValues[TPath]['output'],
    TContext
  >,
  ): UseMutationReturnType<
  TMutationValues[TPath]['output'],
  TError,
  TMutationValues[TPath]['input'],
  TContext
  > {
    return __useMutation((input) => {
      const actualPath = Array.isArray(path) ? path[0] : path
      return (client.mutation as any)(actualPath, input, opts)
    }, opts)
  }

  return {
    useQuery,
    useMutation,
  }
}
