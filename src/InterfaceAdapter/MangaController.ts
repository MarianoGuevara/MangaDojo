import { ListAllMangas } from "../Application/Manga/ListAllMangas";
import { UploadOneMangaInputDTO, UploadOneManga } from "../Application/Manga/UploadOneManga";
import { IHttpRequest } from "./Interfaces/IHttpRequest";
import { IHttpResponse } from "./Interfaces/IHttpResponse";
import { IController } from "./Interfaces/IController";
import { ControllersValidator } from "./Shared/ControllersValidator";

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
        ControllersValidator.validate(req.body, ['title', 'description', 'authorId', 'startDate', 'totalVolumes', 'totalRating']);
        const body = req.body as Record<string, unknown>; // diccionario key string value no se sabe
        
        body.startDate = ControllersValidator.parseDate(body.startDate, 'startDate');
        if (body.endDate != undefined) {
            body.endDate = ControllersValidator.parseDate(body.endDate, "endDate");
        }
        
        const mangaDto = req.body as UploadOneMangaInputDTO;

        const insertedManga = await this.insertOneMangaUseCase.execute(mangaDto);

        return { 
            statusCode: 201, 
            body: insertedManga 
        } as IHttpResponse;
    }
}