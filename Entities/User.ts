class User {
    id: number;
    name: string;
    surname: string;
    email: string;
    password: string;
    createdAt: Date;
    role: Role;
    
    constructor(id: number, name: string, surname: string, email: string, password: string, createdAt: Date, role: Role) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.createdAt = createdAt;
        this.role = role;
    }
}