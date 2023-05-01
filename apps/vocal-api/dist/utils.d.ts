declare const Readable: any;
export declare class Base64ReadableStream extends Readable {
    private buffer;
    private position;
    constructor(base64: string);
    _read(size: number): void;
}
export {};
