import { AppError } from "./AppError";

export class InvalidCredentialsException extends AppError {
    constructor(message: string) {
        super(message);
        // code: 400;
    }
}