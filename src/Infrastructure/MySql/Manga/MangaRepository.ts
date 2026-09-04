// RowDataPacket: el obj q mysql te devuelve cuando haces un select
// ResultSetHeader: el obj q mysql te devuelve cuando haces un insert, update o delete
import { Pool, RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { IMangaRepository } from "../../../Application/Manga/IMangaRepository";
import { MySqlMangaReadRow } from "./Dtos/MySqlMangaReadRow";
import { MySqlMangaInsert } from "./Dtos/MySqlMangaInsert";
import { Manga } from "../../../Entities/Manga";
import { MangaMapper } from "./MangaMapper";
import { RepositoryException } from "../../../Entities/Exceptions/RepositoryException";

export class MangaRepository implements IMangaRepository {
	private pool: Pool;
	private mangaMapper: MangaMapper;

	constructor(pool: Pool, mangaMapper: MangaMapper) {
		this.pool = pool;
		this.mangaMapper = mangaMapper;
	}

	async getAll(): Promise<Manga[]> {
		try{
			const sql = `
			SELECT 
				m.id, 
				m.title, 
				m.description, 
				m.start_date, 
				m.end_date,
				m.total_volumes,
				m.total_rating,
				a.id as author_id, 
				a.name as author_name, 
				a.surname as author_surname,
				a.nickname as author_nickname
			FROM mangas m
			JOIN authors a ON m.mangas_id_author = a.id;
			`;

			const [rows] = await this.pool.query<RowDataPacket[]>(sql);
			
			return rows.map((row) => {
				const mangaRow = row as MySqlMangaReadRow; // casteo implicito de mysqlrow a mi firma. Si hay que hacer casteo explicito, aca
				return this.mangaMapper.toMangaFromMangaReadRow(mangaRow);
			});
		} catch (error: any) { throw new RepositoryException("Error en la base de datos MySql: " + error.message); }
	}

	async getByName(title: string): Promise<Manga | null> {	
		try{
			const sql = `
			SELECT * from mangas
			WHERE title = ?;
			`;
			const values = [title];

			const [rows] = await this.pool.query<RowDataPacket[]>(sql, values);
			
			if (rows.length === 0) {
				return null;
			} else {
				const mangaRow = rows[0] as MySqlMangaReadRow;
				return this.mangaMapper.toMangaFromMangaReadRow(mangaRow);
			}
		} catch (error: any) { throw new RepositoryException("Error en la base de datos MySql: " + error.message); }
	}

	async insertOne(manga: Manga): Promise<Manga> {
		try {
			const mangaModel: MySqlMangaInsert = this.mangaMapper.toMangaInsertFromManga(manga);

			const sql = `
			INSERT INTO mangas (title, description, start_date, end_date, total_volumes, total_rating, mangas_id_author)
			VALUES (?, ?, ?, ?, ?, ?, ?)
			`;

			const values = [
				mangaModel.title,
				mangaModel.description,
				mangaModel.start_date,
				mangaModel.end_date,
				mangaModel.total_volumes,
				mangaModel.total_rating,
				mangaModel.mangas_id_author
			];
			
			const [result] = await this.pool.query<ResultSetHeader>(sql, values);

		
			manga.id = result.insertId
			return manga;
		} catch (error: any) { throw new RepositoryException("Error en la base de datos MySql: " + error.message); }
  	}
	
	async getById(id: number): Promise<Manga> {
    	throw new Error("Method not implemented.");
  	}
}