import { RegisterUserUseCase } from "../Application/User/RegisterUser";
import { IController } from "./Interfaces/IController";
import { IHttpRequest } from "./Interfaces/IHttpRequest";
import { IHttpResponse } from "./Interfaces/IHttpResponse";
import { RegisterUserInput } from "../Application/User/RegisterUser";
import { LoginUserInput, LoginUserUseCase } from "../Application/User/LoginUser";
import { ControllersValidator } from "./Shared/ControllersValidator";
import { ListAllUsers } from "../Application/User/ListAllUsers";

export class UserController implements IController {
    private registerUserUseCase: RegisterUserUseCase;
    private loginUserUseCase: LoginUserUseCase;
    private listAllUsersUseCase: ListAllUsers;

    constructor(registerUserUseCase: RegisterUserUseCase, loginUserUseCase: LoginUserUseCase, listAllUsersUseCase: ListAllUsers) {
        this.registerUserUseCase = registerUserUseCase;
        this.loginUserUseCase = loginUserUseCase;
        this.listAllUsersUseCase = listAllUsersUseCase;
    }

    async getAll(_request: IHttpRequest<unknown, any, any>): Promise<IHttpResponse<unknown>> {
        return {
            statusCode: 200,
            body: await this.listAllUsersUseCase.execute()
        } as IHttpResponse
    }

    async registerUser(req: IHttpRequest): Promise<IHttpResponse> {
        ControllersValidator.validate(req.body, ["name", "surname", "nickname", "email", "password", "role", 'bornAt', 'profilePicture']);
        
        const body = req.body as Record<string, unknown>;

        ControllersValidator.parseDate(body.bornAt, 'bornAt');

        const userInsertDto = req.body as RegisterUserInput;
       
        const res = await this.registerUserUseCase.execute(userInsertDto);
        
        return  {
            statusCode: 200,
            body: res
        } as IHttpResponse;    
    }

    async loginUser(req: IHttpRequest): Promise<IHttpResponse> {
        ControllersValidator.validate(req.body, ["email", "password"])

        const userLoginDto = req.body as LoginUserInput;
        
        const res = await this.loginUserUseCase.execute(userLoginDto);
        
        return  {
            statusCode: 200,
            body: res
        } as IHttpResponse; 
    
    }
}