import { ValidationException } from "./Exceptions/ValidationException";
import { Validator } from "./Shared/Validator";

export class User {
    private id: number;
    private name: string;
    private surname: string;
    private nickname: string;
    private email: string;
    private password: string;
    private createdAt: Date;
    private role: Role;

    public get Id(): number {
        return this.id;
    }
    public set Id(id: number) {
        this.id = id;
    }
    public get Name(): string {
        return this.name;
    }
    public get Surname(): string {
        return this.surname;
    }
    public get Nickname(): string {
        return this.nickname;
    }
    public get Email(): string {
        return this.email;
    }
    public get Password(): string {
        return this.password;
    }
    public get CreatedAt(): Date {
        return this.createdAt;
    }
    public get Role(): Role {
        return this.role;
    }

    constructor(id: number, name: string, surname: string, nickname: string, email: string, password: string, createdAt: Date, role: Role) {
        this.id = id;
    
        this.name = this.validateName(name);
        this.surname = this.validateSurname(surname);
        this.nickname = this.validateNickname(nickname);
        this.email = this.validateEmail(email);
        this.createdAt = this.validateLogicDate(createdAt);
        this.role = this.validateRole(role);

        this.password = password; // ya le llega hasheada por eso no valida
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

    private validateLogicDate(createdAt: Date): Date {
        // validar que sea una fecha valida; que sea menor a la fecha actual; que no sea una fecha futura
        return createdAt;
    }
    private validateRole(role: string): Role {
        if (role !== "admin" && role !== "user") {
            throw new ValidationException(`Invalid role type: ${role}`);
        }
        return role as Role;
    }
}