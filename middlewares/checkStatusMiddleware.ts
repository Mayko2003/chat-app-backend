import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import handleHttpError from "../utils/handleHttpError";


const checkStatusMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const username = req.params.username;

        const user = await User.findOne({ $or: [{ _id: id }, { username }] });

        if (!user || !user.status) throw { message: 'User not found', code: 404 };

        next();

    } catch (error: any) {
        handleHttpError(res, error.code || 500, error.message);
    }
}

export default checkStatusMiddleware