import { Request, Response } from "express";
import logger from "../../utils/winstonLogger";
import z from 'zod';
import { createUser, login } from "./user.service";
import zodErrorHandler from "../../utils/zodErrorHandler";
import { Http } from "winston/lib/winston/transports";
import { HttpCode } from "../../constants/constants";

const NAMESPACE = '[User]';

export const cCreateUser = async (req: Request, res: Response): Promise<any> => {
    try {
        logger.log({
            level: 'info',
            message: `${NAMESPACE}, attempting to create user `,
        });

        const dataSchema = z.object({
            username: z.string({
                required_error: 'username is required',
                invalid_type_error: 'username must be a string'
            }),
            email: z.string({
                required_error: 'email is required',
                invalid_type_error: 'email must be a string'
            }),
            password: z.string({
                required_error: 'password is required',
                invalid_type_error: 'password must be a string'
            }),
            profileImage: z.string({
                required_error: 'profileImage url is required',
                invalid_type_error: 'profileImage url must be a string'
            })
        });

        const data = {
            ...req.body,
            username: req.body.username,
            email: req.body.email,
            profileImage: req.body.profileImage,
            password: req.body.password,
        }
        dataSchema.parse(data);
        const result = await createUser(data);
        res.json(result);

    } catch (error: any) {
        logger.error(NAMESPACE, error);
        if (error?.issues?.length > 0) {
            const responseStr = zodErrorHandler(error?.issues);
            return res.status(HttpCode.BAD_REQUEST).json({ message: responseStr });
        }
        return res
            .status(HttpCode.INTERNAL_SERVER_ERROR)
            .json({ message: `${error}, INTERNAL_SERVER_ERROR` });

    }
}

export const cLogin = async (req: Request, res: Response): Promise<any> => {
    try {
        logger.log({
            level: 'info',
            message: `${NAMESPACE}, attempting to login`
        });

        const dataSchema = z.object({
            email: z.string({
                required_error: 'email is required',
                invalid_type_error: 'email must be a string'
            }),
            password: z.string({
                required_error: 'password is required',
                invalid_type_error: 'password must be a string'
            })
        });

        const data = {
            ...req.body,
            email: req.body.email,
            password: req.body.password
        }
        dataSchema.parse(data);
        const result = await login(data);
        res.json(result);
    } catch (error: any) {
        logger.error(NAMESPACE, error);
        if (error?.issues?.length > 0) {
            const responseStr = zodErrorHandler(error?.issues);
            return res.status(HttpCode.BAD_REQUEST).json({ message: responseStr });
        }
        return res
            .status(HttpCode.INTERNAL_SERVER_ERROR)
            .json({ message: `${error}, INTERNAL_SERVER_ERROR` });
    }
}