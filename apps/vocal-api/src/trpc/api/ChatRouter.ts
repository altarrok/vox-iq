import { z } from "zod";
import { t } from "../trpc";

export const ChatRouter = t.router({
    chatCompletion: t.procedure
        .query(async ({ input, ctx }) => {
            try {
                const chatCompletion = await ctx.openai.createChatCompletion({
                    model: "gpt-3.5-turbo",
                    max_tokens: 100,
                    messages: [
                        { "role": "system", "content": "You are a voice assistant, give short and precise answers" },
                        { "role": "user", "content": "Hello!" },
                        { "role": "assistant", "content": "Hello there! How may I assist you today?" },
                        { "role": "user", "content": "Can you give me a description of Internet?" },
                        { "role": "assistant", "content": "The internet is a global network of interconnected computers and servers that communicate with each other using standardized communication protocols. It allows people to connect, communicate, and share information and resources across geographical and cultural boundaries."}
                    ]
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