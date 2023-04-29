"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.t = exports.createContext = void 0;
const server_1 = require("@trpc/server");
// created for each request
const createContext = ({ req, res, }) => ({}); // no context
exports.createContext = createContext;
exports.t = server_1.initTRPC.context().create();
