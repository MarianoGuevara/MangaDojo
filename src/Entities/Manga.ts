import { Volume } from "./Volume";
import { ValidationException } from "./Exceptions/ValidationException";
import { DateException } from "./Exceptions/DateException";
import { Author } from "./Author";
import { Validator } from "./Shared/Validator";
import { Genre } from "./Enums/Genre";
import { Demographic } from "./Enums/Demographic";

export class Manga {
    private id: number;
    private title: string;
    private description: string;
    private startDate: Date;
    private endDate: Date | null;
    private authorId: number;
    private cover: string;
    private demographic: Demographic;
    private volumes: Volume[];
    private genres: Genre[];
    private totalVolumes: number;

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
    public get AuthorId(): number {
        return this.authorId;
    }
    public get StartDate(): Date {
        return this.startDate;
    }
    public get EndDate(): Date | null {
        return this.endDate;
    }
    public get Cover(): string {
        return this.cover;
    }
    public get Demographic(): Demographic {
        return this.demographic;
    }
    public get Volumes(): Volume[] {
        return this.volumes;
    }
    public get Genres(): Genre[] {
        return this.genres;
    }
    public get TotalVolumes(): number {
        return this.totalVolumes;
    }

    constructor(id: number, title: string, description: string, startDate: Date, endDate: Date | null, authorId: number, cover: string, demographic: Demographic, volumes: Volume[], genres: Genre[], totalVolumes: number) {
        this.id = id;

        this.title = this.validateTitle(title);
        this.description = this.validateDescription(description);
        this.startDate = this.validateStartDate(startDate);
        this.endDate = this.validateEndDate(endDate);

        this.cover = cover;
        this.totalVolumes = totalVolumes;

        this.authorId = authorId; // validar q exista
        this.volumes = volumes;

        this.demographic = demographic;
        this.genres = genres;
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
}   