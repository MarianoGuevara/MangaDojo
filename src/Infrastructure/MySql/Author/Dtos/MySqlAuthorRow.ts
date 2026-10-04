export class MySqlAuthorRow {
    id: number;
    name: string;
    surname: string;
    nickname: string | null;

    constructor(id: number, name: string, surname: string, nickname: string | null) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.nickname = nickname;
    }
}