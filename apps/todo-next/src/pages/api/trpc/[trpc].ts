import * as trpcNext from '@trpc/server/adapters/next';
import { appRouter } from '@todo/api/src/routers/_app';
import { createContext } from '@todo/api/src/context';

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
  onError({ error }) {
    if (error.code === 'INTERNAL_SERVER_ERROR') {
      console.error('Something went wrong', error);
    }
  },
  batching: {
    enabled: true,
  },
});
