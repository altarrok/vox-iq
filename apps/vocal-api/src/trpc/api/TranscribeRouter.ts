import { z } from "zod";
import { t } from "../trpc";
import fs from 'fs';
import tmp from 'tmp-promise';




export const TranscribeRouter = t.router({
    transcribe: t.procedure
        .input(z.object({
            recording: z.string(),
            format: z.enum(["mp3", "mp4", "mpeg", "mpga", "m4a", "wav", "webm"])
        }))
        .mutation(async ({ input, ctx }) => {
            const { path, cleanup } = await tmp.file({ mode: 0o644, postfix: '.' + input.format });
            try {
                await fs.promises.writeFile(path, Buffer.from(input.recording, "base64"))
                const chatCompletion = await ctx.openai.createTranscription(
                    // @ts-ignore
                    fs.createReadStream(path),
                    "whisper-1",
                )
                return chatCompletion.data.text
            } catch (error: any) {
                if (error.response) {
                    console.error(error.response.status);
                    console.error(error.response.data);
                } else {
                    console.error(error.message);
                }
            } finally {
                await cleanup();
            }
        })
})