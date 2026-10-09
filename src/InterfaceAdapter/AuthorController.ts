import { UploadOneAuthorInputDTO, UploadOneAuthor } from "../Application/Author/UploadOneAuthor";
import { IController } from "./Interfaces/IController";
import { IHttpRequest } from "./Interfaces/IHttpRequest";
import { IHttpResponse } from "./Interfaces/IHttpResponse";
import { ControllersValidator } from "./Shared/ControllersValidator";
import { ListAllAuthors } from "../Application/Author/ListAllAuthors";


export class AuthorController implements IController {
    private uploadOneAuthorUseCase: UploadOneAuthor;
    private listAllAuthorsUseCase: ListAllAuthors;
    
    constructor(uploadOneAuthorUseCase: UploadOneAuthor, listAllAuthorsUseCase: ListAllAuthors) {
        this.uploadOneAuthorUseCase = uploadOneAuthorUseCase;
        this.listAllAuthorsUseCase = listAllAuthorsUseCase;
    }

    async getAll(_request: IHttpRequest<unknown, any, any>): Promise<IHttpResponse<unknown>> {
        return {
            statusCode: 200,
            body: await this.listAllAuthorsUseCase.execute()
        } as IHttpResponse
    }

    async uploadOneAuthor(req: IHttpRequest): Promise<IHttpResponse> {
        ControllersValidator.validate(req.body, ['name', 'surname']); // nickname no pq es opcional

        const authorInsertDto = req.body as UploadOneAuthorInputDTO; // implicitamente castea el undefined a null.

        const res = await this.uploadOneAuthorUseCase.execute(authorInsertDto);
        
        return  {
            statusCode: 200,
            body: res
        } as IHttpResponse;    
    }
}