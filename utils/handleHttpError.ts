import { Response } from "express";

const handleHttpError = (res: Response, status: number, message: string) => {
    res.status(status).json({
        status, message
    });
}

export default handleHttpError