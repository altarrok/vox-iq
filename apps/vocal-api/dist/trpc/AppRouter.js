"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const ChatRouter_1 = require("./api/ChatRouter");
const trpc_1 = require("./trpc");
exports.appRouter = trpc_1.t.router({
    chat: ChatRouter_1.ChatRouter
});
