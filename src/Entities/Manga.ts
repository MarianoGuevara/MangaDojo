import { Volume } from "./Volume";
import { ValidationException } from "./Exceptions/ValidationException";
import { DateException } from "./Exceptions/DateException";
import { Author } from "./Author";
import { Validator } from "./Shared/Validator";

export class Manga {
    // poner de atributo SOLO si hay alguna regla de negocio
    private _id: number;
    private _title: string;
    private _description: string;
    private _author: Author;
    private _startDate: Date;
    private _endDate: Date | null;
    private _totalVolumes: number;
    private _totalRating: number;

    public get id(): number {
        return this._id;
    }
    public set id(id: number) {
        this._id = id;
    }
    public get title(): string {
        return this._title;
    }
    public get description(): string {
        return this._description;
    }
    public get author(): Author {
        return this._author;
    }
    public get startDate(): Date {
        return this._startDate;
    }
    public get endDate(): Date | null {
        return this._endDate;
    }
    public get totalVolumes(): number {
        return this._totalVolumes;
    }
    public get totalRating(): number {
        return this._totalRating;
    }

    constructor(title: string, description: string, author: Author, startDate: Date, endDate: Date | null, totalVolumes: number, totalRating: number, id?: number) {
        this._id = id ?? 0;

        this._title = this.validateTitle(title);
        this._description = this.validateDescription(description);
        this._author = this.validateAuthor(author);

        this._startDate = this.validateStartDate(startDate);
        this._endDate = this.validateEndDate(endDate);

        this._totalVolumes = totalVolumes;
        this._totalRating = totalRating;
    }

    private validateTitle(title: string): string { 
        Validator.validateType("string", title);
        Validator.stringMin(title, "title", 5);
        Validator.stringMax(title, "title", 75);
        return title;
    }

    private validateDescription(description: string): string {
        Validator.validateType("string", description);
        Validator.stringMin(description, "description", 15);
        Validator.stringMax(description, "description", 250);
        return description;
    }

    private validateAuthor(author: Author): Author {
        this.validateSpecificType("author", author);
        return author;
    }

    private validateStartDate(startDate: Date): Date {
        Validator.validateType("date", startDate);
        return startDate;
    }
    private validateEndDate(endDate: Date | null): Date | null {
        if (endDate === null) {
            return null;
        }
        Validator.validateType("date", endDate);
        if (endDate < this._startDate) {
            throw new DateException("End date cannot be before start date");
        }
        return endDate;
    }
    
    validateSpecificType(correctType: string, field: any): void {
         switch (correctType) {
            case "author":
                if (!(field instanceof Author)) {
                    throw new ValidationException(`${field} must be an Author`);
                }
                break;
        }
    }
}   