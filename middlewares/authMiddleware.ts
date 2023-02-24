import { NextFunction, Request, Response } from "express";
import handleHttpError from "../utils/handleHttpError";
import jwt from 'jsonwebtoken';
import User from "../models/user";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const header = req.headers.authorization;
        if (!header) handleHttpError(res, 401, 'No token, authorization denied');
        const token = header?.split(' ')[1];
        if (!token) handleHttpError(res, 401, 'No token, authorization denied');

        // Verify token and get payload

        const payload = jwt.verify(token || '', process.env.JWT_SECRET || 'secret') as any;

        // check if user exists
        const user = await User.findById(payload._id);

        if (!user || !user.status) throw { message: 'User not found', code: 404 };

        next();

    } catch (error: any) {
        handleHttpError(res, error.code || 500, error.message);
    }
}

export default authMiddleware;