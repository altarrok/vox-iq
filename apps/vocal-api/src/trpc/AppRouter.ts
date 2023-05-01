import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { ChatRouter } from './api/ChatRouter';
import { TranscribeRouter } from './api/TranscribeRouter';
import { t } from './trpc';

export const appRouter = t.router({
  chat: ChatRouter,
  transcribe: TranscribeRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

export type AppRouterInput = inferRouterInputs<AppRouter>;
export type AppRouterOutput = inferRouterOutputs<AppRouter>;