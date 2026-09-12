import { IAuthorRepository } from "../../../Application/Author/IAuthorRepository";
import { Pool, RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { AuthorMapper } from "./AuthorMapper";
import { Author } from "../../../Entities/Author";
import { MySqlAuthor } from "./Dtos/MySqlAuthor";
import { RepositoryException } from "../../../Entities/Exceptions/RepositoryException";

export class AuthorRepository implements IAuthorRepository {
    private pool: Pool;
    private authorMapper: AuthorMapper;

    constructor(pool: Pool, authorMapper: AuthorMapper) {
        this.pool = pool;
        this.authorMapper = authorMapper;
    }

    getAll(): Promise<Author[]> {
        throw new Error("Not implemented yet");
    }

    async getByNameAndSurname(name: string, surname: string): Promise<Author | null>  {
        try{
            const sql = `
            SELECT * from authors
            WHERE name = ? AND surname = ?;
            `;
            const values = [name, surname];

            const [rows] = await this.pool.query<RowDataPacket[]>(sql, values);
            
            if (rows.length === 0) {
                return null;
            } else {
                const authorMySql = rows[0] as MySqlAuthor;
                return this.authorMapper.toEntityFromAuthor(authorMySql);
            }
            
        } catch (error: any) { throw new RepositoryException("Error en la base de datos MySql: " + error.message); }
    }

    async getById(id: number): Promise<Author | null> {
        try {
            const sql = `
            SELECT * from authors
            WHERE id = ?;
            `;
            const values = [id];

            const [rows] = await this.pool.query<RowDataPacket[]>(sql, values);
            console.log("rows: ", rows);
            if (rows.length === 0) {
                return null;
            } else {
                const authorMySql = rows[0] as MySqlAuthor;
                return this.authorMapper.toEntityFromAuthor(authorMySql);
            }

        } catch (error: any) { throw new RepositoryException("Error en la base de datos MySql: " + error.message); }
    }

    async insertOne(author: Author): Promise<Author> {
        try {
            const sql = `
            INSERT INTO authors 
            VALUES (?, ?, ?, ?);
            `;
            const values = [author.id, author.name, author.surname, author.nickname];

            const [result] = await this.pool.query<ResultSetHeader>(sql, values);

            author.id = result.insertId;
            return author;
        } catch (error: any) { throw new RepositoryException("Error en la base de datos MySql: " + error.message); }
    }
}