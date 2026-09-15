import { AppError } from "./AppError";

export class DuplicateException extends AppError {
    constructor(message: string) {
        super(message);
        // code: 400;
    }
}