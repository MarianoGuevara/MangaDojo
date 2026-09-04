export class MySqlMangaInsert {
    id: number;
    title: string;
    description: string;
    start_date: Date;
    end_date: Date | null;
    total_volumes: number;
    total_rating: number;
    mangas_id_author: number;

    constructor(id: number, title: string, description: string, start_date: Date, end_date: Date | null, total_volumes: number, total_rating: number, mangas_id_author: number) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.start_date = start_date;
        this.end_date = end_date;
        this.total_volumes = total_volumes;
        this.total_rating = total_rating;
        this.mangas_id_author = mangas_id_author;
    }
}