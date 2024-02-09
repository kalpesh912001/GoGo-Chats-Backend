import { Users } from "../../types/user";
import logger from "../../utils/winstonLogger"
import { db } from '../../database/connect';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import config from "../../database/config";
import { daoCreateUser, daoGetUserByEmail } from "./dao";
import generateAuthToken from "../../utils/generateAuthToken";


const NAMESPACE = 'USER'
export const createUser = async (data: Users): Promise<any> => {
    logger.info(NAMESPACE, "Attempting to create");
    const t = await db.sql.transaction();
    try {
        let salt = genSaltSync(config.server.saltrounds);
        data.password = hashSync(data.password, salt);

        // check if user already present in database 
        const user = await daoGetUserByEmail(data?.email, t);
        if (user?.email) return { message: 'Email Already Exists !! ', data: null };

        let userId = await daoCreateUser(data, t);
        await t.commit()
        return { message: 'User Created Successfully', userId };

    } catch (error) {
        await t.rollback();
        logger.error(NAMESPACE, error);
        throw error;
    }
}

export const login = async (data: Users): Promise<any> => {
    try {
        logger.info(NAMESPACE, 'Attempting to login');
        const t = await db.sql.transaction();

        // verify email is present in database or not
        const user = await daoGetUserByEmail(data?.email, t);
        if (!user) return { message: 'User is not registered !', data: null };
        console.log("user *************=> ", user);

        //verify password
        const isPasswordValid = compareSync(data.password, user.password);
        if (!isPasswordValid) return { message: 'Invalid password', data: null };

        // If email and password are valid, generate a token
        const token = generateAuthToken(user.userId);

        return { message: 'Login Successfully', token };

    } catch (error: any) {
        logger.error(NAMESPACE, error);
        throw error;
    }
}