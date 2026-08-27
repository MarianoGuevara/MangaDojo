import { Request, Response, NextFunction } from "express";
import { ValidationException } from "../../Entities/Exceptions/ValidationException";
import { DateException } from "../../Entities/Exceptions/DateException";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ValidationException) {
        res.status(400).json({ error: err.message });
    } else if (err instanceof DateException) {
        res.status(400).json({ error: err.message });
    } else {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// puedo mejorarlo para no tener choclo de condicionales