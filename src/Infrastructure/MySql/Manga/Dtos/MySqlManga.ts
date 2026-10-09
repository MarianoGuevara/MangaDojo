import { RowDataPacket } from "mysql2";

export interface MySqlManga extends RowDataPacket {
    id: number;
    title: string;
    description: string;
    start_date: Date;
    end_date: Date | null;
    total_volumes: number;
    total_rating: number;
    mangas_id_author: number;
}