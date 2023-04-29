"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const zod_1 = require("zod");
const trpc_1 = require("../trpc");
exports.UserRouter = trpc_1.t.router({
    getUser: trpc_1.t.procedure.input(zod_1.z.string()).query(({ input }) => {
        return { id: input, name: 'Bilbo' };
    })
});
