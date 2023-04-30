import { z } from "zod";
import { t } from "../trpc";


export const TranscribeRouter = t.router({
    chatCompletion: t.procedure
        .input(z.object({
            recording: z.string(),
            format: z.enum(["mp3", "mp4", "mpeg", "mpga", "m4a", "wav", "webm"])
        }))
        .query(async ({ input, ctx }) => {
                try {
                    const chatCompletion = await ctx.openai.createTranscription(
                        new File([Buffer.from(input.recording, "base64")], "voice-recording", {
                            type: input.format
                        }),
                        "whisper"
                        )

                    return chatCompletion
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