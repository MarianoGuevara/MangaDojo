import { Role } from "../../../../Entities/Enums/Role";

export class MySqlUser {
    id: number;
    name: string;
    surname: string;
    nickname: string;
    email: string;
    password: string;
    created_at: Date;
    role: Role;
    born_at: Date;
    profile_picture: string;
    
    constructor(id: number, name: string, surname: string, nickname: string, email: string, password: string, createdAt: Date, role: Role, bornAt: Date, profilePicture: string) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.nickname = nickname;
        this.email = email;
        this.password = password;
        this.created_at = createdAt;
        this.role = role;
        this.born_at = bornAt;
        this.profile_picture = profilePicture;
    }
}