"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const ChatRouter_1 = require("./api/ChatRouter");
const TranscribeRouter_1 = require("./api/TranscribeRouter");
const trpc_1 = require("./trpc");
exports.appRouter = trpc_1.t.router({
    chat: ChatRouter_1.ChatRouter,
    transcribe: TranscribeRouter_1.TranscribeRouter
});
