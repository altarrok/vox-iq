import { z } from "zod";
import { t } from "../trpc";

export const UserRouter = t.router({
    getUser: t.procedure.input(z.string()).query(({ input }) => {
        return { id: input, name: 'Bilbo' };
    })
})