import { AppError } from "./AppError";

export class DateException extends AppError {
    constructor(message: string) {
        super(message);
        // code: 401;
    }
}