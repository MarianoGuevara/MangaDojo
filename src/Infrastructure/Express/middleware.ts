import { Request, Response, NextFunction } from "express";
import { ValidationException } from "../../Entities/Exceptions/ValidationException";
import { DateException } from "../../Entities/Exceptions/DateException";
import { RepositoryException } from "../../Entities/Exceptions/RepositoryException";
import { NotFoundException } from "../../Entities/Exceptions/NotFoundException";
import { DuplicateException } from "../../Entities/Exceptions/DuplicateException";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ValidationException) {
        res.status(400).json({ error: err.message });
    } else if (err instanceof DateException) {
        res.status(400).json({ error: err.message });
    }
    else if (err instanceof RepositoryException) {
        res.status(400).json({ error: err.message });
    }
    else if (err instanceof NotFoundException) {
        res.status(400).json({ error: err.message });
    }
    else if (err instanceof DuplicateException) {
        res.status(400).json({ error: err.message });
    }
    else {
        res.status(500).json({ error: "Unexpected Error: " + err.code });
    }
}

// puedo mejorarlo para no tener choclo de condicionales