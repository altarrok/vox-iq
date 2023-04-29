import dotenv from 'dotenv';
import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from '../trpc/AppRouter';
import { createContext } from '../trpc/trpc';

dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

app.listen(port);