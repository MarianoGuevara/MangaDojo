import { Volume } from "./Volume";

export class Manga {
    id: number;
    title: string;
    description: string;
    author: string;
    price: number;
    startDate: Date;
    endDate: Date | null;
    volumes: Volume[];
    
    constructor(id: number, title: string, description: string, author: string, price: number, startDate: Date, endDate: Date | null, volumes: Volume[]) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.author = author;
        this.price = price;
        this.startDate = startDate;
        this.endDate = endDate;
        this.volumes = volumes;
    }

    verifyPrice(): boolean {
        return this.price > 0;
    }
}