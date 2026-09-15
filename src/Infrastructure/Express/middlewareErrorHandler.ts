import { Request, Response, NextFunction } from "express";
import {AppError} from "../../Entities/Exceptions/AppError";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
 
    if (err instanceof AppError) {
        return res.status(404).json({ error: err.message });
    }
    return res.status(404).json({ "Uncaught Error: " : err.message });
}
