import { AppError } from "./AppError";

export class ValidationException extends AppError {
    constructor(message: string) {
        super(message);
        // code: 400;
    }
}