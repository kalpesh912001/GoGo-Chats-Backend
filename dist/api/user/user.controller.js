"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cLogin = exports.cCreateUser = void 0;
const winstonLogger_1 = __importDefault(require("../../utils/winstonLogger"));
const zod_1 = __importDefault(require("zod"));
const user_service_1 = require("./user.service");
const zodErrorHandler_1 = __importDefault(require("../../utils/zodErrorHandler"));
const constants_1 = require("../../constants/constants");
const NAMESPACE = '[User]';
const cCreateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        winstonLogger_1.default.log({
            level: 'info',
            message: `${NAMESPACE}, attempting to create user `,
        });
        const dataSchema = zod_1.default.object({
            username: zod_1.default.string({
                required_error: 'username is required',
                invalid_type_error: 'username must be a string'
            }),
            email: zod_1.default.string({
                required_error: 'email is required',
                invalid_type_error: 'email must be a string'
            }),
            password: zod_1.default.string({
                required_error: 'password is required',
                invalid_type_error: 'password must be a string'
            }),
            profileImage: zod_1.default.string({
                required_error: 'profileImage url is required',
                invalid_type_error: 'profileImage url must be a string'
            })
        });
        const data = Object.assign(Object.assign({}, req.body), { username: req.body.username, email: req.body.email, profileImage: req.body.profileImage, password: req.body.password });
        dataSchema.parse(data);
        const result = yield (0, user_service_1.createUser)(data);
        res.json(result);
    }
    catch (error) {
        winstonLogger_1.default.error(NAMESPACE, error);
        if (((_a = error === null || error === void 0 ? void 0 : error.issues) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            const responseStr = (0, zodErrorHandler_1.default)(error === null || error === void 0 ? void 0 : error.issues);
            return res.status(constants_1.HttpCode.BAD_REQUEST).json({ message: responseStr });
        }
        return res
            .status(constants_1.HttpCode.INTERNAL_SERVER_ERROR)
            .json({ message: `${error}, INTERNAL_SERVER_ERROR` });
    }
});
exports.cCreateUser = cCreateUser;
const cLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        winstonLogger_1.default.log({
            level: 'info',
            message: `${NAMESPACE}, attempting to login`
        });
        const dataSchema = zod_1.default.object({
            email: zod_1.default.string({
                required_error: 'email is required',
                invalid_type_error: 'email must be a string'
            }),
            password: zod_1.default.string({
                required_error: 'password is required',
                invalid_type_error: 'password must be a string'
            })
        });
        const data = Object.assign(Object.assign({}, req.body), { email: req.body.email, password: req.body.password });
        dataSchema.parse(data);
        const result = yield (0, user_service_1.login)(data);
        res.json(result);
    }
    catch (error) {
        winstonLogger_1.default.error(NAMESPACE, error);
        if (((_b = error === null || error === void 0 ? void 0 : error.issues) === null || _b === void 0 ? void 0 : _b.length) > 0) {
            const responseStr = (0, zodErrorHandler_1.default)(error === null || error === void 0 ? void 0 : error.issues);
            return res.status(constants_1.HttpCode.BAD_REQUEST).json({ message: responseStr });
        }
        return res
            .status(constants_1.HttpCode.INTERNAL_SERVER_ERROR)
            .json({ message: `${error}, INTERNAL_SERVER_ERROR` });
    }
});
exports.cLogin = cLogin;
