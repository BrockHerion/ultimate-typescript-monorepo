import { todosRouter } from './todos';
import { createRouter } from '../createRouter';

export const appRouter = createRouter().merge('todos.', todosRouter);

export type AppRouter = typeof appRouter;
