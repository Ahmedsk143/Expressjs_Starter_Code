import express from 'express';
import userRoute from './userRoutes';

const indexRoute = (app: express.Application) => {
    app.get('/', (_req: express.Request, res: express.Response): void => {
        res.status(200).json({ message: 'The root working' });
    });
    app.use('/api/v1', userRoute);
};
export default indexRoute;
