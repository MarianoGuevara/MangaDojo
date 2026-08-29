// RowDataPacket: el obj q mysql te devuelve cuando haces un select
// ResultSetHeader: el obj q mysql te devuelve cuando haces un insert, update o delete
import { Pool, RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { IMangaRepository } from "../../../Application/Manga/IMangaRepository";
import { MangaReadRow } from "./Dtos/MySqlMangaReadRow";
import { MangaInsert } from "./Dtos/MySqlMangaInsert";
import { Manga } from "../../../Entities/Manga";
import { MangaMapper } from "./MangaMapper";

export class MangaRepository implements IMangaRepository {
	private pool: Pool;
	private mangaMapper: MangaMapper;

	constructor(pool: Pool, mangaMapper: MangaMapper) {
		this.pool = pool;
		this.mangaMapper = mangaMapper;
	}

	async getAll(): Promise<Manga[]> {
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
        	const mangaRow = row as MangaReadRow; // casteo implicito de mysqlrow a mi firma. Si hay que hacer casteo explicito, aca
        	return this.mangaMapper.toMangaFromMangaReadRow(mangaRow);
    	});
	}

	async insertOne(manga: Manga): Promise<Manga> {
		const mangaModel: MangaInsert = this.mangaMapper.toMangaInsertFromManga(manga);

		const sql = `
		INSERT INTO mangas (title, description, start_date, end_date, total_volumes, total_rating, manga_id_authos)
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
  	}
	
	async getById(id: number): Promise<Manga> {
    	throw new Error("Method not implemented.");
  	}
}