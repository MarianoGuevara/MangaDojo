import { ValidationException } from "../../Entities/Exceptions/ValidationException";
import { UserBadParamsException } from "../Exceptions/UserBadParamsException";

export class ControllersValidator {
    static validate(body: any, requiredFields: string[]): void {
        if (!body || typeof body !== 'object') {
            throw new UserBadParamsException('The request body must be a valid object');
        }

        const missingFields = requiredFields.filter(field => body[field] === undefined || body[field] === null);

        if (missingFields.length > 0) {
            throw new UserBadParamsException(`Missing required fields: ${missingFields.join(', ')}`);
        }
    }

                        // fecha enviada desde front
    static parseDate(dateSent: unknown, fieldName: string): Date {
        if (typeof dateSent == 'string') {
            const parsedDate = new Date(dateSent);

            // En JS, si una Date es inválida, getTime() retorna NaN
            if (isNaN(parsedDate.getTime())) {
                throw new ValidationException(`The field '${fieldName}' must be a valid date (ex. YYYY-MM-DD).`);
            }
            
            return parsedDate;
        } else {
            throw new ValidationException(`The field '${fieldName}' must be a string`)
        }
    }
}