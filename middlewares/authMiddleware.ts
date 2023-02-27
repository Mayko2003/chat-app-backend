import { NextFunction, Request, Response } from "express";
import handleHttpError from "../utils/handleHttpError";
import jwt from 'jsonwebtoken';
import User from "../models/user";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const header = req.headers.authorization;
        if (!header) throw { message: 'No token, authorization denied', code: 401 };
        const token = header?.split(' ')[1] === 'null' ? undefined: header?.split(' ')[1];
        if (!token) throw { message: 'No token, authorization denied', code: 401 };

        // Verify token and get payload

        const payload = jwt.verify(token || '', process.env.JWT_SECRET || 'secret') as any;

        // check if user exists
        const user = await User.findById(payload._id);

        if (!user || !user.status) throw { message: 'User not found', code: 404 };

        // add user to request
        req.body.loggedUserId = payload._id;

        next();

    } catch (error: any) {
        handleHttpError(res, error.code || 500, error.message);
    }
}

export default authMiddleware;