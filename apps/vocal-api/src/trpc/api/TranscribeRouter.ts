import { z } from "zod";
import { t } from "../trpc";

export const TranscribeRouter = t.router({
    chatCompletion: t.procedure
        .query(async ({ input, ctx }) => {

        })
})