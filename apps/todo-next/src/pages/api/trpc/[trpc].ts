import * as trpcNext from '@trpc/server/adapters/next';
import { appRouter } from '@todo/api/src/routers/_app';
import { createContext } from '@todo/api/src/context';
import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';

const trpcHandler = trpcNext.createNextApiHandler({
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

const cors = Cors({
  methods: ['GET', 'HEAD'],
});

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await runMiddleware(req, res, cors);
  await trpcHandler(req, res);
}
