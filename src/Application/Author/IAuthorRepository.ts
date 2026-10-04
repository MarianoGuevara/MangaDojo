import { Author } from "../../Entities/Author";
import { AuthorGet } from "./AuthorReadDtos/AuthorGet";

export interface IAuthorRepository {
    getAll(): Promise<AuthorGet[]>;
    getByNameAndSurname(name: string, surname: string): Promise<AuthorGet | null>;
    getById(id: number): Promise<AuthorGet | null>;
    insertOne(author: Author): Promise<Author>;
}