import { RowDataPacket } from "mysql2";

export interface MySqlAuthorRow extends RowDataPacket {
    id: number;
    name: string;
    surname: string;
    nickname: string | null;
}