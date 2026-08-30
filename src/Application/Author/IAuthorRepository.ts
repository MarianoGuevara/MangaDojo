import { Author } from "../../Entities/Author";

export interface IAuthorRepository {
    getAll(): Promise<Author[]>;
    getByNameAndSurname(name: string, surname: string): Promise<Author> | null;
    insertOne(author: Author): Promise<Author>;
}