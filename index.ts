import * as dotenv from "dotenv";
import express, { Express } from 'express';
import cors from 'cors';
import connectDB from './config/database';
import routes from './routes';
import { Server } from "socket.io";
import http from 'http';


// env
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

// app
const app: Express = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected');
});

// middlewares
app.use(express.json());
app.use(cors());


// routes
app.use('/api', routes);

// server

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

const main = async () => {
    try {
        await connectDB();
        server.listen(PORT, () => {
            console.log(`Server running on http://${HOST}:${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

main();

