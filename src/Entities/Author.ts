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

    constructor(name: string, surname: string, nickname: string | null, id?: number) {
        this._id = id ?? 0;
        this._name = name;
        this._surname = surname;
        this._nickname = nickname;
    }

}