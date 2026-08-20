import { Volume } from "./Volume";
import { ValidationException } from "./Common/Exceptions/ValidationException";

export class Manga {
    private _id: number;
    private _title: string;
    private _description: string;
    private _author: string;
    private _startDate: Date;
    private _endDate: Date | null;
    private _volumes: Volume[];

    constructor(id: number, title: string, description: string, author: string, startDate: Date, endDate: Date | null, volumes: Volume[]) {
        this._id = id;
        this._volumes = volumes;

        this._title = this.validateString(title, "title", 3);
        this._description = this.validateString(description, "description", 3);
        this._author = this.validateString(author, "author", 3);

        this._startDate = startDate;
        this._endDate = endDate;
    }


    private validateString(data: string, fieldName: string, minLength: number): string {
        if (data.length < minLength) {
            throw new ValidationException(`${fieldName} must be at least ${minLength} characters long`);
        }
        return data;
    }
}   

console.log(new Manga(1, "Test", "Test", "Test", new Date(), null, []));
