import { UserRouter } from './api/UserRouter';
import { t } from './trpc';

export const appRouter = t.router({
  user: UserRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;