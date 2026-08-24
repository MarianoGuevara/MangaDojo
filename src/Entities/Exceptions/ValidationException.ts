export class ValidationException extends Error {
    constructor(message: string) {
        super(message);
        code: 400;
    }
}