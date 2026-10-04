import { Role } from "../../../Entities/Enums/Role";

export class UserGet {
    id: number;
    name: string;
    surname: string;
    nickname: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
    role: Role;

    constructor(id: number, name: string, surname: string, nickname: string, email: string, passwordHash: string, createdAt: Date, role: Role) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.nickname = nickname;
        this.email = email;
        this.passwordHash = passwordHash;
        this.createdAt = createdAt;
        this.role = role;
    }
}