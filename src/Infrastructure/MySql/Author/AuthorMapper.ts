import { Author } from "../../../Entities/Author";
import { MySqlAuthor } from "./Dtos/MySqlAuthor";

export class AuthorMapper {
    toEntityFromAuthor(author: MySqlAuthor): Author {
        return new Author(
            author.name,
            author.surname,
            author.nickname,
            author.id
        )
    }
}