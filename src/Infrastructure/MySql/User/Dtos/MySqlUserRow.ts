import { Role } from "../../../../Entities/Enums/Role";
import { RowDataPacket } from "mysql2";

export interface MySqlUserRow extends RowDataPacket {
    id: number;
    name: string;
    surname: string;
    nickname: string;
    email: string;
    password?: string;
    created_at: Date;
    role: Role;
    born_at: Date | null;
    profile_picture: string | null;
}