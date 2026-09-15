import { Volume } from "./Volume";
import { ValidationException } from "./Exceptions/ValidationException";
import { DateException } from "./Exceptions/DateException";
import { Author } from "./Author";
import { Validator } from "./Shared/Validator";

export class Manga {
    // poner de atributo SOLO si hay alguna regla de negocio
    private id: number;
    private title: string;
    private description: string;
    private author: Author;
    private startDate: Date;
    private endDate: Date | null;
    private totalVolumes: number;
    private totalRating: number;

    public get Id(): number {
        return this.id;
    }
    public set Id(id: number) {
        this.id = id;
    }
    public get Title(): string {
        return this.title;
    }
    public get Description(): string {
        return this.description;
    }
    public get Author(): Author {
        return this.author;
    }
    public get StartDate(): Date {
        return this.startDate;
    }
    public get EndDate(): Date | null {
        return this.endDate;
    }
    public get TotalVolumes(): number {
        return this.totalVolumes;
    }
    public get TotalRating(): number {
        return this.totalRating;
    }

    constructor(title: string, description: string, author: Author, startDate: Date, endDate: Date | null, totalVolumes: number, totalRating: number, id?: number) {
        this.id = id ?? 0;

        this.title = this.validateTitle(title);
        this.description = this.validateDescription(description);
        this.author = this.validateAuthor(author);
        this.startDate = this.validateStartDate(startDate);
        this.endDate = this.validateEndDate(endDate);

        this.totalVolumes = totalVolumes;
        this.totalRating = totalRating;
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

        Validator.validateDateLogic(startDate, "manga start date");
        return startDate;
    }
    
    private validateEndDate(endDate: Date | null): Date | null {
        if (endDate === null) {
            return null;
        }

        Validator.validateType("date", endDate);
        
        if (endDate < this.startDate) {
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