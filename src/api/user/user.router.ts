import { Router } from "express";
import { cCreateUser, cLogin } from "./user.controller";

const userRouter = Router();

userRouter.post('/createUser', cCreateUser);
userRouter.post('/login', cLogin);

export default userRouter;