import { IAuthorRepositoryRead, IAuthorRepositoryWrite } from "../../../Application/Author/IAuthorRepository";
import { Pool, ResultSetHeader } from "mysql2/promise";
import { AuthorMapper } from "./AuthorMapper";
import { Author } from "../../../Entities/Author";
import { MySqlAuthor } from "./Dtos/MySqlAuthor";
import { MySqlAuthorRow } from "./Dtos/MySqlAuthorRow";
import { AuthorGet } from "../../../Application/Author/AuthorReadDtos/AuthorGet";
import { RepositoryException } from "../../Exceptions/RepositoryException";

export class AuthorRepository implements IAuthorRepositoryRead, IAuthorRepositoryWrite {
    private pool: Pool;
    private authorMapper: AuthorMapper;

    constructor(pool: Pool, authorMapper: AuthorMapper) {
        this.pool = pool;
        this.authorMapper = authorMapper;
    }

    async getAll(): Promise<AuthorGet[]> {
        try {
            const sql = `
            SELECT id, name, surname, nickname
            FROM authors;
            `;
            const [rows] = await this.pool.query<MySqlAuthorRow[]>(sql);
            return rows.map((row) => this.authorMapper.toReadDtoFromRow(row));
        } catch (error: any) {
            throw new RepositoryException("Error en la base de datos MySql: " + error.message);
        }
    }

    async getByNameAndSurname(name: string, surname: string): Promise<AuthorGet | null>  {
        try{
            const sql = `
            SELECT * from authors
            WHERE name = ? AND surname = ?;
            `;
            const values = [name, surname];

            const [rows] = await this.pool.query<MySqlAuthorRow[]>(sql, values);
            
            if (rows.length === 0) {
                return null;
            } else {
                return this.authorMapper.toReadDtoFromRow(rows[0]);
            }
            
        } catch (error: any) { throw new RepositoryException("Error en la base de datos MySql: " + error.message); }
    }

    async getById(id: number): Promise<AuthorGet | null> {
        try {
            const sql = `
            SELECT * from authors
            WHERE id = ?;
            `;
            const values = [id];

            const [rows] = await this.pool.query<MySqlAuthorRow[]>(sql, values);
            console.log("rows: ", rows);
            if (rows.length === 0) {
                return null;
            } else {
                return this.authorMapper.toReadDtoFromRow(rows[0]);
            }

        } catch (error: any) { throw new RepositoryException("Error en la base de datos MySql: " + error.message); }
    }

    async insertOne(author: Author): Promise<Author> {
        try {
            const authorModel = this.authorMapper.toMySqlAuthorFromEntity(author);
            const sql = `
            INSERT INTO authors 
            VALUES (?, ?, ?, ?);
            `;
            const values = [authorModel.id, authorModel.name, authorModel.surname, authorModel.nickname];

            const [result] = await this.pool.query<ResultSetHeader>(sql, values);

            author.Id = result.insertId;
            return author;
        } catch (error: any) { throw new RepositoryException("Error en la base de datos MySql: " + error.message); }
    }
}