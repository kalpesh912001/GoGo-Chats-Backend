"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../database/config"));
const generateAuthToken = (userId) => {
    var _a, _b, _c, _d;
    const secretKey = (_b = (_a = config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.server) === null || _a === void 0 ? void 0 : _a.token) === null || _b === void 0 ? void 0 : _b.secretKey;
    const expiresIn = (_d = (_c = config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.server) === null || _c === void 0 ? void 0 : _c.token) === null || _d === void 0 ? void 0 : _d.expireTime;
    console.log(`userid: ${userId}, secretKey : ${secretKey}, expiresIn : ${expiresIn}`);
    const token = jsonwebtoken_1.default.sign({ userId }, secretKey, { expiresIn });
    return token;
};
exports.default = generateAuthToken;
