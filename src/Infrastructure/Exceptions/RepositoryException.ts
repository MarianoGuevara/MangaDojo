import { AppError } from "../../Entities/Exceptions/AppError";

export class RepositoryException extends AppError {
    constructor(message: string) {
        super(message);
        // code: 400;
    }
}