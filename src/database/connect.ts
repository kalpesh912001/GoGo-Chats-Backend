import Sql, { Dialect } from 'sequelize';
import logger from '../utils/winstonLogger';
import config from './config';
const NAMESPACE = '[DATABASE]';

const dialectOptions = {
    bigNumberStrings: true,
}

let db: any = {};
const connect = () => {
    logger.info(`${NAMESPACE} attempting to connect database`);
    try {
        const sql = new Sql.Sequelize(
            config.db.dbName,
            config.db.dbUser,
            config.db.dbPassword,
            {
                host: config.db.dbHost,
                port: config.db.dbPort,
                dialect: config.db.dbDialect as Dialect,
                logging: true,
                dialectOptions: dialectOptions
            }
        );
        db.sql = sql;
        logger.info(`${NAMESPACE} Connection has been established successfully.`);
        return { db };
    } catch (error: any) {
        logger.error(`${NAMESPACE} Unable to connect to the databse ${error?.message}`)
    }
}

export { connect, db };