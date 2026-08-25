import { GetAllMangaUseCase } from "../Application/Manga/GetAllUseCase";
import { IController } from "./Interfaces/IController";
import { IHttpRequest } from "./Interfaces/IHttpRequest";
import { IHttpResponse } from "./Interfaces/IHttpResponse";

export class MangaController implements IController {
    private getAllMangaUseCase: GetAllMangaUseCase<MangaDto>;

    constructor(getAllMangaUseCase: GetAllMangaUseCase<MangaDto>) {
        this.getAllMangaUseCase = getAllMangaUseCase;
    }

    async getAll(req: IHttpRequest): Promise<IHttpResponse> 
    {
        const mangas = await this.getAllMangaUseCase.execute();
        return { statusCode: 200, body: mangas };
    }
}