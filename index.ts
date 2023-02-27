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
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});



// middlewares
app.use(express.json());
app.use(cors());


// routes
app.use('/api', routes);


// manage socket connections

const clients = new Map();

io.sockets.on('connection', (socket) => {

    socket.on('login', (username) => {
        clients.set(username, socket.id);
    });

    socket.on('logout', (username) => {
        clients.delete(username);
    });
});

// server variables
app.set('io', io);
app.set('clients', clients);


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

