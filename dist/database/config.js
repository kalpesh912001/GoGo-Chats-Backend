"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '.env' });
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME;
const SERVER_PORT = Number(Number(process.env.PORT));
const SALT_ROUNDS = Number(process.env.SALTROUNDS);
const SERVER_TOKEN_EXPIRETIME = Number(process.env.SERVER_TOKEN_EXPIRETIME);
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER;
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET;
const dbPassword = process.env.DATABASE_PASSWORD;
const dbUser = process.env.DATABASE_USER;
const dbName = process.env.DATABASE_NAME;
const dbHost = process.env.DATABASE_HOST;
const dbPort = Number(process.env.DATABASE_PORT);
const dbDialect = process.env.DATABASE_DIALECT;
const dialectOptions = {
    bigNumberStrings: true
};
// const config: any = {
//     development: {
//         username: process.env.DATABASE_USER,
//         database: process.env.DATABASE_NAME,
//         password: process.env.DATABASE_PASSWORD,
//         host: process.env.DATABASE_HOST,
//         port: process.env.DATABASE_PORT || 5432,
//         dialect: process.env.DATABASE_DIALECT,
//         dialectOptions: {
//             bigNumberStrings: true,
//             ssl: true
//         }
//     }
// }
const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    saltrounds: SALT_ROUNDS,
    token: {
        expireTime: SERVER_TOKEN_EXPIRETIME,
        issuer: SERVER_TOKEN_ISSUER,
        secretKey: SERVER_TOKEN_SECRET
    }
};
const db = {
    dbPassword,
    dbUser,
    dbName,
    dbHost,
    dbPort,
    dbDialect,
    dialectOptions,
};
const config = {
    db,
    server: SERVER
};
exports.default = config;
