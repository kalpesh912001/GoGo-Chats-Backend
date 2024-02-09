"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const userRouter = (0, express_1.Router)();
userRouter.post('/createUser', user_controller_1.cCreateUser);
userRouter.post('/login', user_controller_1.cLogin);
exports.default = userRouter;
