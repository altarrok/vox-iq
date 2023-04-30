"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base64ReadableStream = void 0;
const { Readable } = require('stream');
class Base64ReadableStream extends Readable {
    constructor(base64) {
        super();
        this.buffer = Buffer.from(base64, 'base64');
        this.position = 0;
    }
    _read(size) {
        const end = this.position + size;
        const chunk = this.buffer.slice(this.position, end);
        this.push(chunk.length > 0 ? chunk : null);
        this.position = end;
    }
}
exports.Base64ReadableStream = Base64ReadableStream;
