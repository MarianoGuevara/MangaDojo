import { Role } from "../../../Entities/Enums/Role";

export class UserGet {
    id: number;
    name: string;
    surname: string;
    nickname: string;
    email: string;
    passwordHash?: string;
    createdAt: Date;
    role: Role;
    bornAt: Date | null;
    profilePicture: string | null;

    constructor(id: number, name: string, surname: string, nickname: string, email: string, passwordHash: string | undefined, createdAt: Date, role: Role, bornAt: Date | null, profilePicture: string | null) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.nickname = nickname;
        this.email = email;
        this.passwordHash = passwordHash;
        this.createdAt = createdAt;
        this.role = role;
        this.bornAt = bornAt;
        this.profilePicture = profilePicture;
    }
}