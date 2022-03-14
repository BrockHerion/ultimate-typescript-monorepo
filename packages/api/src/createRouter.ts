import * as trpc from '@trpc/server';
import { ContextType } from './context';

export function createRouter() {
  return trpc.router<ContextType>();
}
