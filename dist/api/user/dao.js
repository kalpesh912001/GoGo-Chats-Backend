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
Object.defineProperty(exports, "__esModule", { value: true });
exports.daoCreateUser = exports.daoGetUserByEmail = void 0;
const connect_1 = require("../../database/connect");
const daoGetUserByEmail = (email, t) => __awaiter(void 0, void 0, void 0, function* () {
    const [user, meta] = yield connect_1.db.sql.query(`SELECT * from users where email = $email`, {
        transaction: t,
        bind: {
            email: email.toLowerCase()
        }
    });
    return user[0];
});
exports.daoGetUserByEmail = daoGetUserByEmail;
const daoCreateUser = (data, t) => __awaiter(void 0, void 0, void 0, function* () {
    const [userId, meta] = yield connect_1.db.sql.query(`INSERT INTO "users" ("username", "email", "password", "profileimage")
        VALUES ($username, $email, $password, $profileimage)
        returning "userid" `, {
        transaction: t,
        bind: {
            username: data.username,
            email: data.email,
            password: data.password,
            profileimage: data.profileImage
        }
    });
    console.log("### qCreateUser  userId ", userId);
    return userId;
});
exports.daoCreateUser = daoCreateUser;
