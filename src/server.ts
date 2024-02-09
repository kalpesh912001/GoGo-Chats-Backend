import express from 'express';
import cors from 'cors';
import config from './database/config';
import { connect } from './database/connect';
import router from './routes/routes';
import logger from './utils/winstonLogger';

const NAMESPACE = '[SERVER CONNECTION]';
const port = config.server.port;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'DELETE', 'PUT', 'UPDATE', 'PATCH'] }))
app.get('/', (req: any, res: any) => { res.status(200).json({ message: 'Success' }) });
app.use('/app', router);

app.listen(port, async () => {
    logger.log({
        message: `${NAMESPACE} SERVER STARTED ON PORT ${port}`,
        level: 'info'
    });
    await connect();
});