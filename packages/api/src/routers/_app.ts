import { todosRouter } from './todos';
import { createRouter } from '../createRouter';
import superjson from 'superjson';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('todos.', todosRouter);

export type AppRouter = typeof appRouter;
