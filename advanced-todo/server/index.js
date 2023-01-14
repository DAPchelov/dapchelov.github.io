import Express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import router from './router/index.js'
import errorMiddleware from './middlewares/error-middleware.js';

const app = Express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(Express.json());
app.use(cookieParser());
app.use(cors(
    {
    credentials: true,
    origin: true,
    // origin: process.env.CLIENT_URL,
}
));
app.use('/api', router);
app.use(errorMiddleware);



const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, '0.0.0.0', () => console.log("Server started on port: ", PORT))
    } catch (e) {
        console.log (e);
    }
}

start();