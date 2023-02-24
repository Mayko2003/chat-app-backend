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

            if (!username || !password) throw { message: 'Please provide username and password', code: 400 };

            const user = await User.findOne({ username });

            if (!user) throw { message: 'User not found', code: 404 };

            const isMatch = await comparePassword(password, user.password);

            if (!isMatch) throw { message: 'Invalid password', code: 401 };

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
        } catch (error: any) {
            handleHttpError(res, error.code || 500, error.message);
        }
    }
}

export default authController