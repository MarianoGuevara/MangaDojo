import { AppError } from "../../Entities/Exceptions/AppError";

export class UserBadParamsException extends AppError {
    constructor(message: string) {
        super(message);
        // code: 400;
    }
}