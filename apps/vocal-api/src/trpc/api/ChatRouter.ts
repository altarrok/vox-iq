import { z } from "zod";
import { t } from "../trpc";

export const ChatRouter = t.router({
    chatCompletion: t.procedure
        .input(z.object({
            messages: z.object({
                role: z.enum(["user", "system", "assistant"]),
                content: z.string(),
            }).array()
        }))
        .mutation(async ({ input, ctx }) => {
            try {
                const chatCompletion = await ctx.openai.createChatCompletion({
                    model: "gpt-3.5-turbo",
                    max_tokens: 100,
                    messages: input.messages
                })

                return chatCompletion.data.choices[0].message;
            } catch (error: any) {
                if (error.response) {
                    console.error(error.response.status);
                    console.error(error.response.data);
                } else {
                    console.error(error.message);
                }
            }
        })
})