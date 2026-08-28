// RowDataPacket: el obj q mysql te devuelve cuando haces un select
// ResultSetHeader: el obj q mysql te devuelve cuando haces un insert, update o delete
import { Pool, RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { IMangaRepository } from "../../Application/Manga/IMangaRepository";
import { MangaModel } from "../../InterfaceAdapter/Models/MangaModel";
import { MangaWithAuthorModel } from "../../InterfaceAdapter/Models/MangaWithAuthorModel";
import { Manga } from "../../Entities/Manga";
import { IMapper } from "../../Application/Interfaces/IMapper";
import { IMapperDouble } from "../../Application/Interfaces/IMapperDouble";
export class MangaRepository implements IMangaRepository {
	private pool: Pool;
	private mapperWithAutor: IMapperDouble<Manga, MangaWithAuthorModel>;
	private mapper: IMapper<Manga, MangaModel>;

	constructor(pool: Pool, mapperManga: IMapper<Manga, MangaModel>, mapperMangaWithAuthor: IMapperDouble<Manga, MangaWithAuthorModel>) {
		this.pool = pool;
		this.mapper = mapperManga
		this.mapperWithAutor = mapperMangaWithAuthor;
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
        	const mangaWithAuthorModel = row as MangaWithAuthorModel; // si hay que hacer casteo explicito, aca
        	return this.mapperWithAutor.mapToEntity(mangaWithAuthorModel);
    	});
	}

	async getById(id: number): Promise<Manga> {
    	throw new Error("Method not implemented.");
  	}

	async insertOne(manga: Manga): Promise<Manga> {
		const mangaModel = this.mapper.map(manga);

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

        return new Manga(
        manga.title,
        manga.description,
        manga.author, 
        manga.startDate,
        manga.endDate,
        manga.totalVolumes,
        manga.totalRating,
		result.insertId
    );
  	}
}