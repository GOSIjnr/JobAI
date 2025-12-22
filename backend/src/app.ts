import express, { Express } from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import apiRoutes from './routes';

export const createApp = (): Express => {
    const app = express();

    app.use(cors());
    app.use(json());

    app.get('/health', (req, res) => {
        res.json({ status: 'ok', service: 'jobmatch-backend' });
    });

    app.use('/api', apiRoutes);

    return app;
};
