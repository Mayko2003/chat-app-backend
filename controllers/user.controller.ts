import { Request, Response } from 'express';
import handleHttpError from '../utils/handleHttpError';
import User from '../models/user';

const userController = {

    getAllUsers: async (req: Request, res: Response) => {
        try {
            const users = await User.find();
            res.status(200).json({
                status: 200,
                data: users,
            });
        } catch (error) {
            handleHttpError(res, 500, error.message);
        }
    },

    getUserById: async (req: Request, res: Response) => {
        try {
            const user = await User.findById(req.params.id);
            res.status(200).json({
                status: 200,
                data: user,
            });
        } catch (error) {
            handleHttpError(res, 500, error.message);
        }
    },

    getUserByUsername: async (req: Request, res: Response) => {
        try {
            const user = await User.findOne({ username: req.params.username });
            res.status(200).json({
                status: 200,
                data: user,
            });
        } catch (error) {
            handleHttpError(res, 500, error.message);
        }
    },


    createUser: async (req: Request, res: Response) => {
        try {
            const user = await User.create(req.body);
            res.status(201).json({
                status: 201,
                data: user,
            });
        } catch (error) {
            handleHttpError(res, 500, error.message);
        }
    },

    updateUser: async (req: Request, res: Response) => {
        try {
            await User.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).json({
                status: 200,
            });
        } catch (error) {
            handleHttpError(res, 500, error.message);
        }
    },

    deleteUser: async (req: Request, res: Response) => {
        try {
            await User.findByIdAndUpdate(req.params.id, { status: false });
            res.status(200).json({
                status: 200,
            });
        } catch (error) {
            handleHttpError(res, 500, error.message);
        }
    }
};



export default userController;