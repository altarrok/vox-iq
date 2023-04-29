"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const UserRouter_1 = require("./api/UserRouter");
const trpc_1 = require("./trpc");
exports.appRouter = trpc_1.t.router({
    user: UserRouter_1.UserRouter,
});
