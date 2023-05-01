import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from '@trpc/server/adapters/express';
import { Configuration, OpenAIApi } from "openai";
import dotenv from 'dotenv';


dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// created for each request
export const createContext = ({
    req,
    res,
  }: trpcExpress.CreateExpressContextOptions) => ({
    openai,
  });
  type Context = inferAsyncReturnType<typeof createContext>;
  
export const t = initTRPC.context<Context>().create();
