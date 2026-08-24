import { Pool } from "mysql2";
import { IMangaRepository } from "../../Application/Manga/IMangaRepository";
import { MangaModel } from "../../InterfaceAdapter/Models/MangaModel";

class MangaRepository implements IMangaRepository<MangaModel> {
  private pool: Pool;

  constructor(pool: Pool) {
      this.pool = pool;
  }

  async getAll(): Promise<MangaModel[]> {
      this.pool.query("SELECT * FROM mangas", (err, results) => {
          console.log(results);
          console.log(typeof results);
      });
      return []; 
  }

  async getById(id: number): Promise<MangaModel | null> {
    throw new Error("Method not implemented.");
  }

}