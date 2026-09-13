import { Validator } from "./Shared/Validator";

export class Author {
    private id: number;
    private name: string;
    private surname: string;
    private nickname: string | null;

    public get Name(): string {
        return this.name;
    }

    public get Surname(): string {
        return this.surname;
    }

    public get Nickname(): string | null {
        return this.nickname;
    }

    public get Id(): number {
        return this.id;
    }

    public set Id(id: number) {
        this.id = id;
    }

    constructor(name: string, surname: string, nickname: string | null, id?: number) {
        this.id = id ?? 0;

        this.name = this.capitalize(this.validateName(name));
        this.surname = this.capitalize(this.validateSurname(surname));
        this.nickname = this.validateNickname(nickname);
    }

    private validateName(name: string): string { 
        Validator.validateType("string", name);
        Validator.stringMin(name, "name", 1);
        Validator.stringMax(name, "name", 50);
        return name;
    }
     private validateSurname(surname: string): string { 
        Validator.validateType("string", surname);
        Validator.stringMin(surname, "surname", 1);
        Validator.stringMax(surname, "surname", 50);
        return surname;
    }

    private validateNickname(nickname: string | null): string | null { 
        if (nickname != null) {
            Validator.validateType("string", nickname);
            Validator.stringMin(nickname, "nickname", 1);
            Validator.stringMax(nickname, "nickname", 50);
        }
        return nickname;
    }

    capitalize(text: string): string {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }
}