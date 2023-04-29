import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from "vocal-api";
 
export const trpc = createTRPCReact<AppRouter>();