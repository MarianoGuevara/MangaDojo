import { Pool } from "mysql2/promise";
import { IMangaRepository } from "../../Application/Manga/IMangaRepository";
import { MangaModel } from "../../InterfaceAdapter/Models/MangaModel";

export class MangaRepository implements IMangaRepository<MangaModel> {
  private pool: Pool;

  constructor(pool: Pool) {
      this.pool = pool;
  }

  async getAll(): Promise<MangaModel[]> {
    const [rows] = await this.pool.query("SELECT * FROM mangas");
    console.log(rows);
    return rows as MangaModel[];

    // this.pool.query("SELECT * FROM mangas", (err, results) => {
    //       console.log(results);
    //       console.log(typeof results);
    //       return results as MangaModel[];
    //   });
    //   return []; 
  }

  async getById(id: number): Promise<MangaModel | null> {
    throw new Error("Method not implemented.");
  }

}