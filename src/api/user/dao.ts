import { Users } from "../../types/user";
import { db } from "../../database/connect";

export const daoGetUserByEmail = async (email: string, t: any) => {
    const [user, meta] = await db.sql.query(
        `SELECT * from users where email = $email`,
        {
            transaction: t,
            bind: {
                email: email.toLowerCase()
            }
        }
    );
    return user[0];
}

export const daoCreateUser = async (data: Users, t: any) => {
    const [userId, meta] = await db.sql.query(
        `INSERT INTO "users" ("username", "email", "password", "profileimage")
        VALUES ($username, $email, $password, $profileimage)
        returning "userid" `,
        {
            transaction: t,
            bind: {
                username: data.username,
                email: data.email,
                password: data.password,
                profileimage: data.profileImage
            }
        }
    );
    console.log("### qCreateUser  userId ", userId);

    return userId;
}