// RowDataPacket: el obj q mysql te devuelve cuando haces un select
// ResultSetHeader: el obj q mysql te devuelve cuando haces un insert, update o delete
import { Pool, RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { IMangaRepository } from "../../Application/Manga/IMangaRepository";
import { MangaModel } from "../../InterfaceAdapter/Models/MangaModel";
import { Manga } from "../../Entities/Manga";
import { IMapper } from "../../Application/Interfaces/IMapper";

export class MangaRepository implements IMangaRepository {
	private pool: Pool;
	private mapper: IMapper<Manga, MangaModel>;

	constructor(pool: Pool, mapperMangaModel: IMapper<Manga, MangaModel>) {
		this.pool = pool;
		this.mapper = mapperMangaModel;
	}

	async getAll(): Promise<Manga[]> {
		const [rows] = await this.pool.query<RowDataPacket[]>("SELECT * FROM mangas");
		
		 return rows.map((row) => {
        	const mangaModel = row as MangaModel; // si hay que hacer casteo explicito, aca
        	return this.mapper.mapToEntity(mangaModel);
    	});
	}

	async getById(id: number): Promise<Manga> {
    	throw new Error("Method not implemented.");
  	}

	async insertOne(manga: Manga): Promise<Manga> {
		const mangaModel = this.mapper.map(manga);

		const sql = `
		INSERT INTO mangas (title, description, author, start_date, end_date)
		VALUES (?, ?, ?, ?, ?)
		`;

		const values = [
			mangaModel.title,
			mangaModel.description,
			mangaModel.author,
			mangaModel.startDate,
			mangaModel.endDate
		];
		
		const [result] = await this.pool.query<ResultSetHeader>(sql, values);

		mangaModel.id = result.insertId;

        return this.mapper.mapToEntity(mangaModel);
  	}
}