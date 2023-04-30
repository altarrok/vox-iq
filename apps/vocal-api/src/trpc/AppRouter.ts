import { ChatRouter } from './api/ChatRouter';
import { t } from './trpc';

export const appRouter = t.router({
  chat: ChatRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;