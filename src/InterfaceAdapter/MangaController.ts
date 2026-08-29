import { GetAllMangaUseCase } from "../Application/Manga/GetAllUseCase";
import { InsertOneMangaRequestDto, InsertOneMangaUseCase } from "../Application/Manga/InsertOneUseCase";
import { IHttpRequest } from "./Interfaces/IHttpRequest";
import { IHttpResponse } from "./Interfaces/IHttpResponse";
import { IController } from "./Interfaces/IController";

export class MangaController{
    private getAllMangasUseCase: GetAllMangaUseCase;
    private insertOneMangaUseCase: InsertOneMangaUseCase;

    constructor(getAllMangasUseCase: GetAllMangaUseCase,
                insertOneMangaUseCase: InsertOneMangaUseCase
    ) {
        this.getAllMangasUseCase = getAllMangasUseCase;
        this.insertOneMangaUseCase = insertOneMangaUseCase;
    }

    async getAll(req: IHttpRequest): Promise<IHttpResponse> 
    {
        const mangas = await this.getAllMangasUseCase.execute();
        return { 
            statusCode: 200, 
            body: mangas 
        } as IHttpResponse;
    }

    async insertOne(req: IHttpRequest): Promise<IHttpResponse> {
        const mangaDto = req.body as InsertOneMangaRequestDto;

        const insertedManga = await this.insertOneMangaUseCase.execute(mangaDto);

        return { 
            statusCode: 201, 
            body: insertedManga 
        } as IHttpResponse;
    }
}