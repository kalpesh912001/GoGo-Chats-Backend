"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const winstonLogger_1 = __importDefault(require("../utils/winstonLogger"));
const user_router_1 = __importDefault(require("../api/user/user.router"));
const router = express_1.default.Router();
const NAMESPACE = '[Server]';
// log every request 
router.use((req, res, next) => {
    winstonLogger_1.default.info(`${NAMESPACE} METHOD: [${req.method}] - URL:[${req.url}] - IP: [${req.socket.remoteAddress}]`),
        res.on('finish', () => {
            winstonLogger_1.default.info(`${NAMESPACE} METHOD [${req.method}] - URL:[${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
        });
    next();
});
router.get('/healthCheck', (req, res) => { res.status(200).json({ message: 'health check success' }); });
router.use('/user', user_router_1.default);
exports.default = router;
