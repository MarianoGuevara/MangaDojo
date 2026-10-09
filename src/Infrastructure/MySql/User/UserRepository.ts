// RowDataPacket: el obj q mysql te devuelve cuando haces un select
// ResultSetHeader: el obj q mysql te devuelve cuando haces un insert, update o delete
import { Pool, ResultSetHeader } from "mysql2/promise";
import { User } from "../../../Entities/User";
import { IUserRepositoryRead, IUserRepositoryWrite } from "../../../Application/User/IUserRepository";
import { UserMapper } from "./UserMapper";
import { RepositoryException } from "../../Exceptions/RepositoryException";
import { MySqlUserRow } from "./Dtos/MySqlUserRow";
import { UserGet } from "../../../Application/User/UserReadDtos/UserGet";

export class UserRepository implements IUserRepositoryRead, IUserRepositoryWrite {
    private pool: Pool;
    private userMapper: UserMapper;

    constructor(pool: Pool, userMapper: UserMapper) {
        this.pool = pool;
        this.userMapper = userMapper;
    }

    async getAll(): Promise<UserGet[]> {
        try {
            const sql = `
            SELECT id, name, surname, nickname, email, created_at, role, profile_picture, born_at
            FROM users;
            `;
            const [rows] = await this.pool.query<MySqlUserRow[]>(sql);
            return rows.map((row) => this.userMapper.toReadDtoFromRow(row));
        } catch (error: any) {
            throw new RepositoryException("Error en la base de datos MySql: " + error.message);
        }
    }

    async findByEmail(email: string): Promise<UserGet | undefined> {
        try {
            const sql = `
            SELECT
                id,
                name,
                surname,
                nickname,
                email,
                password,
                created_at,
                role,
                born_at,
                profile_picture
            FROM users
            WHERE email = ?;
            `;
            
            const [rows] = await this.pool.query<MySqlUserRow[]>(sql, [email]);
            if (rows.length === 0) {
                return undefined;
            } else {
                return this.userMapper.toReadDtoFromRow(rows[0]);
            }
        } catch (error: any) {
            throw new RepositoryException("Error en la base de datos MySql: " + error.message);
        }
    } 

    async save(user: User): Promise<User> {
        try {
            const sqlUser = this.userMapper.toMySqlUserFromEntity(user);
            
            const sql = `
            INSERT INTO users (name, surname, nickname, email, password, created_at, role, born_at, profile_picture)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
            `;  
            
            const [result] = await this.pool.execute<ResultSetHeader>(sql, [
                sqlUser.name,
                sqlUser.surname,
                sqlUser.nickname,
                sqlUser.email,
                sqlUser.password,
                sqlUser.created_at,
                sqlUser.role,
                sqlUser.born_at,
                sqlUser.profile_picture
            ]);

            user.Id = result.insertId; // Asignar el ID generado por la base de datos al usuario
            return user;
        } catch (error: any) {
            throw new RepositoryException("Error en la base de datos MySql: " + error.message);
        }
    }
}