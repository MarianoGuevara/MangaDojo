export class MySqlUser {
    id: number;
    name: string;
    surname: string;
    nickname: string;
    email: string;
    password: string;
    created_at: Date;
    role: Role;
    
    constructor(id: number, name: string, surname: string, nickname: string, email: string, password: string, createdAt: Date, role: Role) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.nickname = nickname;
        this.email = email;
        this.password = password;
        this.created_at = createdAt;
        this.role = role;
    }
}