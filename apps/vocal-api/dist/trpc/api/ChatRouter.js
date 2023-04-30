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
const trpc_1 = require("../trpc");
exports.ChatRouter = trpc_1.t.router({
    chatCompletion: trpc_1.t.procedure
        .query(({ input, ctx }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const chatCompletion = yield ctx.openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                max_tokens: 100,
                messages: [
                    { "role": "system", "content": "You are a voice assistant, give short and precise answers" },
                    { "role": "user", "content": "Hello!" },
                    { "role": "assistant", "content": "Hello there! How may I assist you today?" },
                    { "role": "user", "content": "Can you give me a description of Internet?" },
                    { "role": "assistant", "content": "The internet is a global network of interconnected computers and servers that communicate with each other using standardized communication protocols. It allows people to connect, communicate, and share information and resources across geographical and cultural boundaries." }
                ]
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
