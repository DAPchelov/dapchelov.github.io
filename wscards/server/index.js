import Express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import restRouter from './router/restRouter.js'
import errorMiddleware from './middlewares/error-middleware.js';

import { createServer } from 'http';
import { Server } from 'socket.io';

import WsController from './controllers/wsController'

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = Express();
const httpServer = createServer(app);

export const io = new Server(httpServer, {
    cors: {
        origin: 'http://176.109.109.16:3000',
        methods: ['GET', 'POST']
    }
});

WsController();

app.use(Express.json());
app.use(cookieParser());
app.use(cors(
    {
        credentials: true,
        origin: 'http://176.109.109.16:3000',
        // origin: process.env.CLIENT_URL,
    }
));
app.use('/api', restRouter);
app.use(errorMiddleware);

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        httpServer.listen(PORT, '0.0.0.0', () => console.log('Server wsCards started on port: ', PORT))
    } catch (e) {
        console.log(e);
    }
}

start();