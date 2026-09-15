import { UploadOneAuthorInputDTO, UploadOneAuthor } from "../Application/Author/UploadOneAuthor";
import { IController } from "./Interfaces/IController";
import { IHttpRequest } from "./Interfaces/IHttpRequest";
import { IHttpResponse } from "./Interfaces/IHttpResponse";
import { ControllersValidator } from "./Shared/ControllersValidator";


export class AuthorController implements IController {
    private uploadOneAuthorUseCase: UploadOneAuthor;
    
    constructor(uploadOneAuthorUseCase: UploadOneAuthor) {
        this.uploadOneAuthorUseCase = uploadOneAuthorUseCase;
    }

    async getAll(request: IHttpRequest<unknown, any, any>): Promise<IHttpResponse<unknown>> {
        return {
            statusCode: 400,
            body: "Not implemented"
        } as IHttpResponse
    }

    async uploadOneAuthor(req: IHttpRequest): Promise<IHttpResponse> {
        ControllersValidator.validate(req.body, ['name', 'surname']);

        const authorInsertDto = req.body as UploadOneAuthorInputDTO; // implicitamente castea el undefined a null.

        const res = await this.uploadOneAuthorUseCase.execute(authorInsertDto);
        console.log(res);
        return  {
            statusCode: 200,
            body: res
        } as IHttpResponse;    
    }
}