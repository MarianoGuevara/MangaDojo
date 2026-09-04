export class DuplicateException extends Error {
    constructor(message: string) {
        super(message);
        // code: 400;
    }
}