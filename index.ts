import * as dotenv from "dotenv";
import express, { Express } from 'express';
import cors from 'cors';
import connectDB from './config/database';
import routes from './routes';

// env
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

// app
const app: Express = express();

// middlewares
app.use(express.json());
app.use(cors());


// routes
app.use('/api', routes );

// server

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

const main = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on:  ${HOST}:${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

main();

