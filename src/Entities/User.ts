import { Validator } from "./Shared/Validator";

export class User {
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
    
        this.name = this.validateName(name);
        this.surname = this.validateSurname(surname);
        this.nickname = this.validateNickname(nickname);
        this.email = this.validateEmail(email);
        this.password = this.validatePassword(password);
        this.createdAt = this.validateCreatedAt(createdAt);

        this.role = role;
    }

    private validateName(name: string): string {
        Validator.validateType("string", name);
        Validator.stringMin(name, "name", 2);
        Validator.stringMax(name, "name", 50);
        return name;
    }
    private validateSurname(surname: string): string {
        Validator.validateType("string", surname);
        Validator.stringMin(surname, "surname", 2);
        Validator.stringMax(surname, "surname", 50);
        return surname;
    }

    private validateNickname(nickname: string): string {
        Validator.validateType("string", nickname);
        Validator.stringMin(nickname, "nickname", 2);
        Validator.stringMax(nickname, "nickname", 50);
        return nickname;
    }

    private validateEmail(email: string): string {
        Validator.validateType("string", email);
        Validator.stringMin(email, "email", 5);
        Validator.stringMax(email, "email", 75);
        
        // VALIDAR Q SEA UN EMAIL VALIDO
        
        return email;
    }

    private validatePassword(password: string): string {
        Validator.validateType("string", password);
        Validator.stringMin(password, "password", 8);
        Validator.stringMax(password, "password", 30);

        // vaaliidar que tengaa nums o algo 
        
        return password;
    }
    private validateCreatedAt(createdAt: Date): Date {
        // validar que sea una fecha valida; que sea menor a la fecha actual; que no sea una fecha futura
        return createdAt;
    }
}