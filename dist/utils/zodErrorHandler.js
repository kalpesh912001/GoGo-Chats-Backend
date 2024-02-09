"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zodErrorHandler = (issues) => {
    let responseStr = '';
    issues.forEach((item, i) => {
        responseStr +=
            `${item.message}` + (issues.length == 1 || i == issues.length - 1 ? '.' : ',');
    });
    return responseStr;
};
exports.default = zodErrorHandler;
