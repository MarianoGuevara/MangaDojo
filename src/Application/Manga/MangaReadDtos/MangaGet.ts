import { Demographic } from "../../../Entities/Enums/Demographic";
import { Genre } from "../../../Entities/Enums/Genre";

export class MangaGet {
    id: number;
    title: string;
    description: string;
    cover: string;
    startDate: Date;
    endDate: Date | null;
    demographic: Demographic;
    totalVolumes: number;
    genres?: Genre[];

    authorname: string;
    authorsurname: string;

    constructor(id: number, title: string, description: string, startDate: Date, endDate: Date | null, authorname: string, authorsurname: string, cover: string, demographic: Demographic, totalVolumes: number, genres?: Genre[]) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.authorname = authorname;
        this.authorsurname = authorsurname;
        this.cover = cover;
        this.demographic = demographic;
        this.totalVolumes = totalVolumes;
        this.genres = genres;
    }
}