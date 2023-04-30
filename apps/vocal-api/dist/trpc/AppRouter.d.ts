export declare const appRouter: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
    ctx: {
        openai: import("openai").OpenAIApi;
    };
    meta: object;
    errorShape: import("@trpc/server").DefaultErrorShape;
    transformer: import("@trpc/server").DefaultDataTransformer;
}>, {
    chat: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
        ctx: {
            openai: import("openai").OpenAIApi;
        };
        meta: object;
        errorShape: import("@trpc/server").DefaultErrorShape;
        transformer: import("@trpc/server").DefaultDataTransformer;
    }>, {
        chatCompletion: import("@trpc/server").BuildProcedure<"mutation", {
            _config: import("@trpc/server").RootConfig<{
                ctx: {
                    openai: import("openai").OpenAIApi;
                };
                meta: object;
                errorShape: import("@trpc/server").DefaultErrorShape;
                transformer: import("@trpc/server").DefaultDataTransformer;
            }>;
            _ctx_out: {
                openai: import("openai").OpenAIApi;
            };
            _input_in: typeof import("@trpc/server").unsetMarker;
            _input_out: typeof import("@trpc/server").unsetMarker;
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
            _meta: object;
        }, import("openai").ChatCompletionResponseMessage | undefined>;
    }>;
    transcribe: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
        ctx: {
            openai: import("openai").OpenAIApi;
        };
        meta: object;
        errorShape: import("@trpc/server").DefaultErrorShape;
        transformer: import("@trpc/server").DefaultDataTransformer;
    }>, {
        transcribe: import("@trpc/server").BuildProcedure<"mutation", {
            _config: import("@trpc/server").RootConfig<{
                ctx: {
                    openai: import("openai").OpenAIApi;
                };
                meta: object;
                errorShape: import("@trpc/server").DefaultErrorShape;
                transformer: import("@trpc/server").DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
                openai: import("openai").OpenAIApi;
            };
            _input_in: {
                recording: string;
                format: "mp3" | "mp4" | "mpeg" | "mpga" | "m4a" | "wav" | "webm";
            };
            _input_out: {
                recording: string;
                format: "mp3" | "mp4" | "mpeg" | "mpga" | "m4a" | "wav" | "webm";
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, string | undefined>;
    }>;
}>;
export type AppRouter = typeof appRouter;
