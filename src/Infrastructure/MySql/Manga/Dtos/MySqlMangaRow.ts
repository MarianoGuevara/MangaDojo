import { Demographic } from "../../../../Entities/Enums/Demographic";
// import { Genre } from "../../../../Entities/Enums/Genre";

export class MySqlMangaRow {
    id: number;
    title: string;
    description: string;
    start_date: Date;
    end_date: Date | null;
    total_volumes: number;
    cover: string;
    demographic: Demographic;
    author_name: string;
    author_surname: string;
    genres: string;

    constructor(id: number, title: string, description: string, start_date: Date, end_date: Date | null, total_volumes: number, cover: string, demographic: Demographic, author_name: string, author_surname: string, genres: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.start_date = start_date;
        this.end_date = end_date;
        this.total_volumes = total_volumes;
        this.cover = cover;
        this.demographic = demographic;
        this.author_name = author_name;
        this.author_surname = author_surname;
        this.genres = genres;
    }   
}