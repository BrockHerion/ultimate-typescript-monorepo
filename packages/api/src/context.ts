import { inferAsyncReturnType } from '@trpc/server';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';

export async function createContext(contextOptions?: CreateNextContextOptions) {
  const req = contextOptions?.req;
  const res = contextOptions?.res;

  return {
    req,
    res,
  };
}

export type ContextType = inferAsyncReturnType<typeof createContext>;
