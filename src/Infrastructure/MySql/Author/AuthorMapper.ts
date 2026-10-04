import { Author } from "../../../Entities/Author";
import { AuthorGet } from "../../../Application/Author/AuthorReadDtos/AuthorGet";
import { MySqlAuthorRow } from "./Dtos/MySqlAuthorRow";
import { MySqlAuthor } from "./Dtos/MySqlAuthor";

export class AuthorMapper {
    toReadDtoFromRow(author: MySqlAuthorRow): AuthorGet {
        return new AuthorGet(
            author.id,
            author.name,
            author.surname,
            author.nickname
        )
    }

    toMySqlAuthorFromEntity(author: Author): MySqlAuthor {
        return new MySqlAuthor(
            author.Id,
            author.Name,
            author.Surname,
            author.Nickname
        );
    }
}