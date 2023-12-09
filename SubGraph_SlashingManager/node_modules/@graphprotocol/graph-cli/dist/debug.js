"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
debug_1.default.formatters.L = immutableList => {
    return JSON.stringify(immutableList);
};
debug_1.default.formatters.M = immutableMap => {
    if (immutableMap?.toMap != null) {
        return JSON.stringify(immutableMap.toMap());
    }
    if (typeof immutableMap?.toJS === 'function') {
        return JSON.stringify(immutableMap.toJS());
    }
    if (typeof immutableMap === 'object') {
        return JSON.stringify(immutableMap);
    }
    return immutableMap;
};
exports.default = debug_1.default;
