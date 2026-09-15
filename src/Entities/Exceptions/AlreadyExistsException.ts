import { AppError } from "./AppError";

export class AlreadyExistsException extends AppError {
    constructor(message: string) {
        super(message);
        // code: 400;
    }
}