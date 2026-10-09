import { Demographic } from "../../../../Entities/Enums/Demographic";
import { RowDataPacket } from "mysql2";
// import { Genre } from "../../../../Entities/Enums/Genre";

export interface MySqlMangaRow extends RowDataPacket {
    id: number;
    title: string;
    description: string;
    start_date: Date;
    end_date: Date | null;
    total_volumes: number;
    cover: string;
    demographic: Demographic;
    author_fullname: string;
    genres: string;
}