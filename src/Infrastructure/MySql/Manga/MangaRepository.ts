// RowDataPacket: el obj q mysql te devuelve cuando haces un select
// ResultSetHeader: el obj q mysql te devuelve cuando haces un insert, update o delete
import { Pool, RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { IMangaRepositoryRead, IMangaRepositoryWrite } from "../../../Application/Manga/IMangaRepository";
import { MySqlMangaRow } from "./Dtos/MySqlMangaRow";
import { MySqlManga } from "./Dtos/MySqlManga";
import { Manga } from "../../../Entities/Manga";
import { MangaMapper } from "./MangaMapper";
import { RepositoryException } from "../../Exceptions/RepositoryException";
import { MangaGet } from "../../../Application/Manga/MangaReadDtos/MangaGet";
import { MangaTitleGet } from "../../../Application/Manga/MangaReadDtos/MangaTitleGet";
import { MySqlMangaTitleRow } from "./Dtos/MySqlMangaTitleRow";

export class MangaRepository implements IMangaRepositoryRead, IMangaRepositoryWrite {
	private pool: Pool;
	private mangaMapper: MangaMapper;

	constructor(pool: Pool, mangaMapper: MangaMapper) {
		this.pool = pool;
		this.mangaMapper = mangaMapper;
	}

	async getAll(): Promise<MangaGet[]> {
		try{
			const sql = `
			SELECT 
				m.id, 
				m.title, 
				m.description, 
				m.start_date, 
				m.end_date,
				m.total_volumes,
				m.cover,
				m.demographic,
				CONCAT(a.name, ' ', a.surname) AS author_name, 
				GROUP_CONCAT(g.genre_name SEPARATOR ',') AS genres
			FROM mangas AS m
			INNER JOIN authors AS a 
			ON m.mangas_id_author = a.id
			INNER JOIN genres as g
			ON g.manga_id = m.id
			GROUP BY m.id
			;
			`;

			const [rows] = await this.pool.query<RowDataPacket[]>(sql);
			
			return rows.map((row) => {
				const mangaRow = row as MySqlMangaRow;
				return this.mangaMapper.toReadDtoFromRow(mangaRow);
			});
		} catch (error: any) { throw new RepositoryException("Error en la base de datos MySql: " + error.message); }
	}

	async getByTitle(title: string): Promise<MangaTitleGet | null> {	
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
				a.name as author_name, 
				a.surname as author_surname,
				a.nickname as author_nickname
			FROM mangas m
			JOIN authors a ON m.mangas_id_author = a.id
			WHERE m.title = ?;
			`;
			const values = [title];

			const [rows] = await this.pool.query<RowDataPacket[]>(sql, values);
		
			if (rows.length === 0) {
				return null;
			} else {
				const mangaRow = rows[0] as MySqlMangaTitleRow;
				return this.mangaMapper.toTitleReadDtoFromRow(mangaRow);
			}
		} catch (error: any) { throw new RepositoryException("Error en la base de datos MySql: " + error.message); }
	}

	async insertOne(manga: Manga): Promise<Manga> {
		try {
			const mangaModel: MySqlManga = this.mangaMapper.toMySqlMangaFromEntity(manga);

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

		
			manga.Id = result.insertId
			return manga;
		} catch (error: any) { throw new RepositoryException("Error en la base de datos MySql: " + error.message); }
  	}
}