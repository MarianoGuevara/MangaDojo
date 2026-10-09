import { InvalidCredentialsException } from "../../Entities/Exceptions/InvalidCredentialsException";
import { IHasher } from "../Shared/IHasher";
import { ITokenService } from "./IJsonWebToken";
import { IUserRepositoryRead } from "./IUserRepository";

export interface LoginUserInput {
    email: string;
    password: string;
}

export interface LoginUserOutput {
    token: string;
    user: {
        email: string;
        name: string;
    };
}

export class LoginUserUseCase {
    private userReadRepository: IUserRepositoryRead;
    private passwordHasher: IHasher;
    private tokenProvider: ITokenService;
    
    constructor(
        userReadRepository: IUserRepositoryRead,
        passwordHasher: IHasher,
        tokenProvider: ITokenService
    ) {
        this.userReadRepository = userReadRepository;
        this.passwordHasher = passwordHasher;
        this.tokenProvider = tokenProvider;
    }

    async execute(input: LoginUserInput): Promise<LoginUserOutput> {
        const user = await this.userReadRepository.findByEmail(input.email);
        
        if (user == undefined) {
            throw new InvalidCredentialsException("Mail does not exist");
        }

        if (user.passwordHash === undefined) {
            throw new InvalidCredentialsException("Password hash is not available");
        }
        
        const isPasswordValid = await this.passwordHasher.compare(
            input.password,
            user.passwordHash
        );

        if (isPasswordValid == false) {
            throw new InvalidCredentialsException("Password is incorrect");
        }

        const token = this.tokenProvider.generateToken({
            userId: user.id,
            email: user.email
        });
        
        return {
            token,
            user: {
                email: user.email,
                name: user.name
            }
        };
    }
}