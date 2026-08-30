import { Validator } from "./Shared/Validator";

export class Author {
    private _id: number;
    private _name: string;
    private _surname: string;
    private _nickname: string | null;

    public get name(): string {
        return this._name;
    }

    public get surname(): string {
        return this._surname;
    }

    public get nickname(): string | null {
        return this._nickname;
    }

    public get id(): number {
        return this._id;
    }

    public set id(id: number) {
        this._id = id;
    }

    constructor(name: string, surname: string, nickname: string | null, id?: number) {
        this._id = id ?? 0;

        this._name = this.capitalize(this.validateName(name));
        this._surname = this.capitalize(this.validateSurname(surname));
        this._nickname = this.validateNickname(nickname);
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