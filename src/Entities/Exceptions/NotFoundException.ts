import { AppError } from "./AppError";

export class NotFoundException extends AppError {
    constructor(message: string) {
        super(message);
        // code: 400;
    }
}