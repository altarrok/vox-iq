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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRouter = void 0;
const zod_1 = require("zod");
const trpc_1 = require("../trpc");
exports.ChatRouter = trpc_1.t.router({
    chatCompletion: trpc_1.t.procedure
        .input(zod_1.z.object({
        messages: zod_1.z.object({
            role: zod_1.z.enum(["user", "system", "assistant"]),
            content: zod_1.z.string(),
        }).array()
    }))
        .mutation(({ input, ctx }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const chatCompletion = yield ctx.openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                max_tokens: 100,
                messages: input.messages
            });
            return chatCompletion.data.choices[0].message;
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
    }))
});
