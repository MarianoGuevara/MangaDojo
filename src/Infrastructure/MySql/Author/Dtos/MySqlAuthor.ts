export class MySqlAuthor {
    id: number;
    name: string;
    surname: string;
    nickname: string | null;
    
    constructor(id: number, name: string, surname: string, nickname: string) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.nickname = nickname;
    }
}