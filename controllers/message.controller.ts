import { Request, Response } from 'express';
import Message from '../models/message';
import User from '../models/user';
import handleHttpError from '../utils/handleHttpError';
import { Server } from 'socket.io';

const messageController = {

    getAllMessages: async (req: Request, res: Response) => {
        try {
            const messages = await Message.find();
            res.status(200).json({
                status: 200,
                data: messages,
            });
        } catch (error: any) {
            handleHttpError(res, 500, error.message);
        }
    },

    sendMessage: async (req: Request, res: Response) => {
        try {
            const username = req.params.username;
            const fromUser = req.body.loggedUser;

            const toUser = await User.findOne({ username });

            const message = await Message.create({
                toUser: toUser?._id,
                fromUser: fromUser?._id,
                message: req.body.message,
            });

            const io: Server = req.app.get('io');
            const clients: Map<any, any> = req.app.get('clients');


            io.to(clients.get(username)).to(clients.get(fromUser.username)).emit('message', message);

            res.status(200).json({
                status: 200,
                data: message,
            });

        } catch (error: any) {
            handleHttpError(res, 500, error.message);
        }
    },


    getConversation: async (req: Request, res: Response) => {
        try {
            const username = req.params.username;
            const fromUser = req.body.loggedUser;

            const toUser = await User.findOne({ username });

            const messages = await Message.find({
                $or: [
                    { toUser: toUser?._id, fromUser: fromUser?._id },
                    { toUser: fromUser?._id, fromUser: toUser?._id }
                ]
            }).populate('fromUser', 'username').populate('toUser', 'username');

            res.status(200).json({
                status: 200,
                data: messages,
            });

        } catch (error: any) {
            handleHttpError(res, 500, error.message);
        }
    }


}


export default messageController;