import express from 'express';
import logger from '../utils/winstonLogger';
import userRouter from '../api/user/user.router';

const router = express.Router();
const NAMESPACE = '[Server]';

// log every request 
router.use((req, res, next) => {
    logger.info(
        `${NAMESPACE} METHOD: [${req.method}] - URL:[${req.url}] - IP: [${req.socket.remoteAddress}]`
    ),
        res.on('finish', () => {
            logger.info(
                `${NAMESPACE} METHOD [${req.method}] - URL:[${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
            )
        });
    next();
});

router.get('/healthCheck', (req, res) => { res.status(200).json({ message: 'health check success' }) });
router.use('/user', userRouter);

export default router;
