"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const glob_1 = __importDefault(require("glob"));
exports.globPromise = (pattern, opts) => {
    return new Promise((resolve, reject) => {
        glob_1.default(pattern, opts, (error, files) => {
            if (error) {
                reject(error);
            }
            resolve(files);
        });
    });
};
