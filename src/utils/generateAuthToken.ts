import jwt from 'jsonwebtoken';
import config from '../database/config';

const generateAuthToken = (userId: number) => {
    const secretKey = config?.server?.token?.secretKey;
    const expiresIn = config?.server?.token?.expireTime;

    console.log(`userid: ${userId}, secretKey : ${secretKey}, expiresIn : ${expiresIn}`);

    const token = jwt.sign({ userId }, secretKey, { expiresIn });
    return token;
}

export default generateAuthToken;