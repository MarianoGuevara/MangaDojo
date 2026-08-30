import { ValidationException } from "../Exceptions/ValidationException";

export class Validator {
    static stringMin(data: string, fieldName: string, minLength: number): string {
        if (data.trim().length < minLength) {
            throw new ValidationException(`${fieldName} must be at least ${minLength} characters long`);
        }
        return data;
    }

    static stringMax(data: string, fieldName: string, maxLength: number): string {
        if (data.trim().length > maxLength) {
            throw new ValidationException(`${fieldName} must be at most ${maxLength} characters long`);
        }
        return data;
    }

    static validateType(correctType: string, field: any): void {
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
}