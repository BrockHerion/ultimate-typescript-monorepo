import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from '@todo/api/src/routers/_app';
import { createContext } from '@todo/api/src/context';
import Cors from 'cors';

const app = express();
const port = 4000;

const cors = Cors({
  methods: ['GET', 'HEAD'],
});

app.use(cors);

app.use(
  '/api/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

app.listen(port, () => console.log(`Running on port ${port}`));
