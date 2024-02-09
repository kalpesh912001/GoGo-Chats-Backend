"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.connect = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const winstonLogger_1 = __importDefault(require("../utils/winstonLogger"));
const config_1 = __importDefault(require("./config"));
const NAMESPACE = '[DATABASE]';
const dialectOptions = {
    bigNumberStrings: true,
};
let db = {};
exports.db = db;
const connect = () => {
    winstonLogger_1.default.info(`${NAMESPACE} attempting to connect database`);
    try {
        const sql = new sequelize_1.default.Sequelize(config_1.default.db.dbName, config_1.default.db.dbUser, config_1.default.db.dbPassword, {
            host: config_1.default.db.dbHost,
            port: config_1.default.db.dbPort,
            dialect: config_1.default.db.dbDialect,
            logging: true,
            dialectOptions: dialectOptions
        });
        db.sql = sql;
        winstonLogger_1.default.info(`${NAMESPACE} Connection has been established successfully.`);
        return { db };
    }
    catch (error) {
        winstonLogger_1.default.error(`${NAMESPACE} Unable to connect to the databse ${error === null || error === void 0 ? void 0 : error.message}`);
    }
};
exports.connect = connect;
