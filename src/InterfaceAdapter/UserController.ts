import { RegisterUserUseCase } from "../Application/User/RegisterUser";
import { IController } from "./Interfaces/IController";
import { IHttpRequest } from "./Interfaces/IHttpRequest";
import { IHttpResponse } from "./Interfaces/IHttpResponse";
import { RegisterUserInput } from "../Application/User/RegisterUser";
import { LoginUserInput, LoginUserUseCase } from "../Application/User/LoginUser";

export class UserController implements IController {
    private registerUserUseCase: RegisterUserUseCase;
    private loginUserUseCase: LoginUserUseCase;

    constructor(registerUserUseCase: RegisterUserUseCase, loginUserUseCase: LoginUserUseCase) {
        this.registerUserUseCase = registerUserUseCase;
        this.loginUserUseCase = loginUserUseCase;
    }

    async getAll(request: IHttpRequest<unknown, any, any>): Promise<IHttpResponse<unknown>> {
        return {
            statusCode: 400,
            body: "Not implemented"
        } as IHttpResponse
    }

    async registerUser(req: IHttpRequest): Promise<IHttpResponse> {
        const userInsertDto = req.body as RegisterUserInput;
        console.log(userInsertDto);
        const res = await this.registerUserUseCase.execute(userInsertDto);
        
        return  {
            statusCode: 200,
            body: res
        } as IHttpResponse;    
    }

    async loginUser(req: IHttpRequest): Promise<IHttpResponse> {
        const userLoginDto = req.body as LoginUserInput;
        
        const res = await this.loginUserUseCase.execute(userLoginDto);
        
        return  {
            statusCode: 200,
            body: res
        } as IHttpResponse; 
    
    }
}