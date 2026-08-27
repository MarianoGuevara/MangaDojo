export class MangaModel {
    id: number;
    title: string;
    author: string;
    description: string;
    startDate: Date;
    endDate: Date | null;

    constructor(id: number, title: string, author: string, description: string, startDate: Date, endDate: Date | null) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}