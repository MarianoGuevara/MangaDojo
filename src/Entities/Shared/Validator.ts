import { ValidationException } from "../Exceptions/ValidationException";

export class Validator {
    static stringMin(data: string, fieldName: string, minLength: number): string {
        if (data.length < minLength) {
            throw new ValidationException(`${fieldName} must be at least ${minLength} characters long`);
        }
        return data;
    }

    static stringMax(data: string, fieldName: string, maxLength: number): string {
        console.log("data.length: ", data.length);
        if (data.length > maxLength) {
            throw new ValidationException(`${fieldName} must be at most ${maxLength} characters long`);
        }
        return data;
    }

    static validateType(correctType: string, field: any): void {
        /**
         *  contempled types:
         *  - string
         *  - number
         *  - date
         */
        
        switch (correctType) {
            case "string":
                if (typeof field !== "string") {
                    throw new ValidationException(`${field} must be a string`);
                }
                break;
            case "number":
                if (typeof field !== "number") {
                    throw new ValidationException(`${field} must be a number`);
                }
                break;
            case "date":
                if (!(field instanceof Date)) {
                    throw new ValidationException(`${field} must be a date`);
                }
                break;
        }
    }

    static validateDateLogic(date: Date, fieldName: string): Date {
        const now = new Date();
        if (date > now) {
            throw new ValidationException(`${fieldName} cannot be in the future`);
        }
        return date;
    }
}