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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./database/config"));
const connect_1 = require("./database/connect");
const routes_1 = __importDefault(require("./routes/routes"));
const winstonLogger_1 = __importDefault(require("./utils/winstonLogger"));
const NAMESPACE = '[SERVER CONNECTION]';
const port = config_1.default.server.port;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({ origin: '*', methods: ['GET', 'POST', 'DELETE', 'PUT', 'UPDATE', 'PATCH'] }));
app.get('/', (req, res) => { res.status(200).json({ message: 'Success' }); });
app.use('/app', routes_1.default);
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    winstonLogger_1.default.log({
        message: `${NAMESPACE} SERVER STARTED ON PORT ${port}`,
        level: 'info'
    });
    yield (0, connect_1.connect)();
}));
