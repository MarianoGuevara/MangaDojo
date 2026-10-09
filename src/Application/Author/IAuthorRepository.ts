import { Author } from "../../Entities/Author";
import { AuthorGet } from "./AuthorReadDtos/AuthorGet";

export interface IAuthorRepositoryRead {
    getAll(): Promise<AuthorGet[]>;
    getByNameAndSurname(name: string, surname: string): Promise<AuthorGet | null>;
    getById(id: number): Promise<AuthorGet | null>;
}

export interface IAuthorRepositoryWrite {
    insertOne(author: Author): Promise<Author>;
}