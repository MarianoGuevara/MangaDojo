import { AppError } from "../../Entities/Exceptions/AppError";

export class UnauthorizedException extends AppError {
    constructor(message: string) {
        super(message);
        // code: 400;
    }
}