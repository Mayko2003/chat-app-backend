import { Request, Response } from 'express';
import Message from '../models/message';
import User from '../models/user';
import handleHttpError from '../utils/handleHttpError';

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
            const fromUser = req.body.loggedUserId;

            const toUser = await User.findOne({ username });

            const message = await Message.create({
                toUser: toUser?._id,
                fromUser,
                message: req.body.message,
            });

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
            const fromUser = req.body.loggedUserId;

            const toUser = await User.findOne({ username });

            const messages = await Message.find({
                $or: [
                    { toUser: toUser?._id, fromUser },
                    { toUser: fromUser, fromUser: toUser?._id }
                ]
            });

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