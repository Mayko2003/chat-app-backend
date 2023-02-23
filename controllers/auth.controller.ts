import { Request, Response } from "express"
import handleHttpError from "../utils/handleHttpError"
import User from "../models/user"
import { comparePassword } from '../utils/handlePassword'
import jwt from 'jsonwebtoken'

const authController = {

    login: async (req: Request, res: Response) => {
        try {
            const username: string = req.body.username
            const password: string = req.body.password

            if (!username || !password) handleHttpError(res, 400, 'Username and password are required');

            const user = await User.findOne({ username });

            if (!user) handleHttpError(res, 404, 'User not found');

            const isMatch = await comparePassword(password, user.password);

            if (!isMatch) handleHttpError(res, 400, 'Invalid password');

            const payload = {
                _id: user._id,
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', {
                expiresIn: 3600
            });

            res.status(200).json({
                status: 200,
                data: {
                    token,
                    user,
                }
            });
        } catch (error) {
            handleHttpError(res, 500, error.message);
        }
    }
}

export default authController