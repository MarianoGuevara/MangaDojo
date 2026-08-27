import { Volume } from "./Volume";
import { ValidationException } from "./Exceptions/ValidationException";
import { DateException } from "./Exceptions/DateException";

export class Manga {
    private _id: number;
    private _title: string;
    private _description: string;
    private _author: string;
    private _startDate: Date;
    private _endDate: Date | null;
    private _volumes: Volume[];

    public get id(): number {
        return this._id;
    }
    public get title(): string {
        return this._title;
    }
    public get description(): string {
        return this._description;
    }
    public get author(): string {
        return this._author;
    }
    public get startDate(): Date {
        return this._startDate;
    }
    public get endDate(): Date | null {
        return this._endDate;
    }
    public get volumes(): Volume[] {
        return this._volumes;
    }


    constructor(title: string, description: string, author: string, startDate: Date, endDate: Date | null, volumes?: Volume[], id?: number) {
        this._id = id ?? 0;
        this._volumes = volumes ?? [];

        this._title = this.validateTitle(title);
        this._description = this.validateDescription(description);
        this._author = this.validateAuthor(author);

        this._startDate = this.validateStartDate(startDate);
        this._endDate = this.validateEndDate(endDate);
    }
    private validateTitle(title: string): string { 
        this.validateType("string", title);
        this.validateStringMin(title, "title", 5);
        this.validateStringMax(title, "title", 75);
        return title;
    }

    private validateDescription(description: string): string {
        this.validateType("string", description);
        this.validateStringMin(description, "description", 15);
        this.validateStringMax(description, "description", 250);
        return description;
    }

    private validateAuthor(author: string): string {
        this.validateType("string", author);
        this.validateStringMin(author, "author", 1);
        this.validateStringMax(author, "author", 75);
        return author;
    }

    private validateStartDate(startDate: Date): Date {
        this.validateType("date", startDate);
        return startDate;
    }
    private validateEndDate(endDate: Date | null): Date | null {
        if (endDate === null) {
            return null;
        }
        this.validateType("date", endDate);
        if (endDate < this._startDate) {
            throw new DateException("End date cannot be before start date");
        }
        return endDate;
    }
    // genericas 

    private validateType(correctType: string, field: any): string {
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
        }
        return field;
    }

    private validateStringMin(data: string, fieldName: string, minLength: number): string {
        if (data.length < minLength) {
            throw new ValidationException(`${fieldName} must be at least ${minLength} characters long`);
        }
        return data;
    }

    private validateStringMax(data: string, fieldName: string, maxLength: number): string {
        if (data.length > maxLength) {
            throw new ValidationException(`${fieldName} must be at most ${maxLength} characters long`);
        }
        return data;
    }
}   

// console.log(new Manga("Test", "Test", "Test", new Date(), null));
