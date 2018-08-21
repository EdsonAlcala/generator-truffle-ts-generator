"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requiredFor = (field) => {
    return (value) => {
        if (!value) {
            return requiredMessageFor(field);
        }
        return true;
    };
};
const requiredMessageFor = (value) => {
    return `${value} cannot be empty`;
};
