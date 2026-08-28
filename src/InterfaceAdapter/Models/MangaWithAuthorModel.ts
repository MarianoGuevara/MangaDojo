export class MangaWithAuthorModel {
    id: number;
    title: string;
    description: string;
    start_date: Date;
    end_date: Date | null;
    total_volumes: number;
    total_rating: number;
    author_id: number;
    author_name: string;
    author_surname: string;
    author_nickname: string | null;

    constructor(id: number, title: string, description: string, start_date: Date, end_date: Date | null, total_volumes: number, total_rating: number, author_id: number, author_name: string, author_surname: string, author_nickname: string | null) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.start_date = start_date;
        this.end_date = end_date;
        this.total_volumes = total_volumes;
        this.total_rating = total_rating;
        this.author_id = author_id;
        this.author_name = author_name;
        this.author_surname = author_surname;
        this.author_nickname = author_nickname;
    }
}