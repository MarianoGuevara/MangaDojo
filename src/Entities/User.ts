class User {
    id: number;
    name: string;
    surname: string;
    nickname: string;
    email: string;
    password: string;
    createdAt: Date;
    role: Role;
    
    constructor(id: number, name: string, surname: string, nickname: string, email: string, password: string, createdAt: Date, role: Role) {
        this.id = id;
    
        this.name = name;
        this.surname = surname;
        this.nickname = nickname;
        this.email = email;
        this.password = password;
        this.createdAt = createdAt;
        this.role = role;
    }
}