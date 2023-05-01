"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranscribeRouter = void 0;
const zod_1 = require("zod");
const trpc_1 = require("../trpc");
const fs_1 = __importDefault(require("fs"));
const tmp_promise_1 = __importDefault(require("tmp-promise"));
exports.TranscribeRouter = trpc_1.t.router({
    transcribe: trpc_1.t.procedure
        .input(zod_1.z.object({
        recording: zod_1.z.string(),
        format: zod_1.z.enum(["mp3", "mp4", "mpeg", "mpga", "m4a", "wav", "webm"])
    }))
        .mutation(({ input, ctx }) => __awaiter(void 0, void 0, void 0, function* () {
        const { path, cleanup } = yield tmp_promise_1.default.file({ mode: 0o644, postfix: '.' + input.format });
        try {
            yield fs_1.default.promises.writeFile(path, Buffer.from(input.recording, "base64"));
            const chatCompletion = yield ctx.openai.createTranscription(
            // @ts-ignore https://github.com/openai/openai-node/issues/127
            fs_1.default.createReadStream(path), "whisper-1");
            return chatCompletion.data.text;
        }
        catch (error) {
            if (error.response) {
                console.error(error.response.status);
                console.error(error.response.data);
            }
            else {
                console.error(error.message);
            }
        }
        finally {
            yield cleanup();
        }
    }))
});
