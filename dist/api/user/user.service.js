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
exports.login = exports.createUser = void 0;
const winstonLogger_1 = __importDefault(require("../../utils/winstonLogger"));
const connect_1 = require("../../database/connect");
const bcryptjs_1 = require("bcryptjs");
const config_1 = __importDefault(require("../../database/config"));
const dao_1 = require("./dao");
const generateAuthToken_1 = __importDefault(require("../../utils/generateAuthToken"));
const NAMESPACE = 'USER';
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    winstonLogger_1.default.info(NAMESPACE, "Attempting to create");
    const t = yield connect_1.db.sql.transaction();
    try {
        let salt = (0, bcryptjs_1.genSaltSync)(config_1.default.server.saltrounds);
        data.password = (0, bcryptjs_1.hashSync)(data.password, salt);
        // check if user already present in database 
        const user = yield (0, dao_1.daoGetUserByEmail)(data === null || data === void 0 ? void 0 : data.email, t);
        if (user === null || user === void 0 ? void 0 : user.email)
            return { message: 'Email Already Exists !! ', data: null };
        let userId = yield (0, dao_1.daoCreateUser)(data, t);
        yield t.commit();
        return { message: 'User Created Successfully', userId };
    }
    catch (error) {
        yield t.rollback();
        winstonLogger_1.default.error(NAMESPACE, error);
        throw error;
    }
});
exports.createUser = createUser;
const login = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        winstonLogger_1.default.info(NAMESPACE, 'Attempting to login');
        const t = yield connect_1.db.sql.transaction();
        // verify email is present in database or not
        const user = yield (0, dao_1.daoGetUserByEmail)(data === null || data === void 0 ? void 0 : data.email, t);
        if (!user)
            return { message: 'User is not registered !', data: null };
        console.log("user *************=> ", user);
        //verify password
        const isPasswordValid = (0, bcryptjs_1.compareSync)(data.password, user.password);
        if (!isPasswordValid)
            return { message: 'Invalid password', data: null };
        // If email and password are valid, generate a token
        const token = (0, generateAuthToken_1.default)(user.userId);
        return { message: 'Login Successfully', token };
    }
    catch (error) {
        winstonLogger_1.default.error(NAMESPACE, error);
        throw error;
    }
});
exports.login = login;
