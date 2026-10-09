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

    authorFullName: string;

    rating: number | null; 

    constructor(id: number, title: string, description: string, startDate: Date, endDate: Date | null, authorFullName: string, cover: string, demographic: Demographic, totalVolumes: number, genres?: Genre[], rating: number | null = null) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.authorFullName = authorFullName;
        this.cover = cover;
        this.demographic = demographic;
        this.totalVolumes = totalVolumes;
        this.genres = genres;
        this.rating = rating;
    }
}