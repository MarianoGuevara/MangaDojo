// RowDataPacket: el obj q mysql te devuelve cuando haces un select
// ResultSetHeader: el obj q mysql te devuelve cuando haces un insert, update o delete
import { Pool, RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { User } from "../../../Entities/User";
import { IUserRepository } from "../../../Application/User/IUserRepository";
import { UserMapper } from "./UserMapper";
import { RepositoryException } from "../../Exceptions/RepositoryException";
import { MySqlUserRow } from "./Dtos/MySqlUserRow";
import { UserGet } from "../../../Application/User/UserReadDtos/UserGet";

export class UserRepository implements IUserRepository {
    private pool: Pool;
    private userMapper: UserMapper;

    constructor(pool: Pool, userMapper: UserMapper) {
        this.pool = pool;
        this.userMapper = userMapper;
    }

    async getAll(): Promise<UserGet[]> {
        throw new RepositoryException("getAll method is not implemented yet");
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
                role
            FROM users
            WHERE email = ?;
            `;
            
            const [rows] = await this.pool.query<RowDataPacket[]>(sql, [email]);
            if (rows.length === 0) {
                return undefined;
            } else {
                const userRow = rows[0] as MySqlUserRow;
                return this.userMapper.toReadDtoFromRow(userRow);
            }
        } catch (error: any) {
            throw new RepositoryException("Error en la base de datos MySql: " + error.message);
        }
    } 

    async save(user: User): Promise<User> {
        try {
            const sqlUser = this.userMapper.toMySqlUserFromEntity(user);
            
            const sql = `
            INSERT INTO users (name, surname, nickname, email, password, created_at, role)
            VALUES (?, ?, ?, ?, ?, ?, ?);
            `;  
            
            const [result] = await this.pool.execute<ResultSetHeader>(sql, [
                sqlUser.name,
                sqlUser.surname,
                sqlUser.nickname,
                sqlUser.email,
                sqlUser.password,
                sqlUser.created_at,
                sqlUser.role
            ]);

            user.Id = result.insertId; // Asignar el ID generado por la base de datos al usuario
            return user;
        } catch (error: any) {
            throw new RepositoryException("Error en la base de datos MySql: " + error.message);
        }
    }
}