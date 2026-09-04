import { ListAllMangas } from "../Application/Manga/ListAllMangas";
import { UploadOneMangaInputDTO, UploadOneManga } from "../Application/Manga/UploadOneManga";
import { IHttpRequest } from "./Interfaces/IHttpRequest";
import { IHttpResponse } from "./Interfaces/IHttpResponse";
import { IController } from "./Interfaces/IController";

export class MangaController{
    private getAllMangasUseCase: ListAllMangas;
    private insertOneMangaUseCase: UploadOneManga;

    constructor(getAllMangasUseCase: ListAllMangas,
                insertOneMangaUseCase: UploadOneManga
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
        // al hacer la conversión implicita, taanto los campos de req.body como los de la interfaz deben ser IDENTICOS
        const mangaDto = req.body as UploadOneMangaInputDTO;
        mangaDto.startDate = new Date(mangaDto.startDate);
        if (mangaDto.endDate != null) {
            mangaDto.endDate = new Date(mangaDto.endDate);
        }

        const insertedManga = await this.insertOneMangaUseCase.execute(mangaDto);

        return { 
            statusCode: 201, 
            body: insertedManga 
        } as IHttpResponse;
    }
}