import { InvalidCredentialsException } from "../../Entities/Exceptions/InvalidCredentialsException";
import { IHasher } from "../Shared/IHasher";
import { ITokenService } from "./IJsonWebToken";
import { IUserRepository } from "./IUserRepository";

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
    private userRepository: IUserRepository;
    private passwordHasher: IHasher;
    private tokenProvider: ITokenService;
    
    constructor(
        userRepository: IUserRepository,
        passwordHasher: IHasher,
        tokenProvider: ITokenService
    ) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
        this.tokenProvider = tokenProvider;
    }

    async execute(input: LoginUserInput): Promise<LoginUserOutput> {
        const user = await this.userRepository.findByEmail(input.email);
        
        if (user == undefined) {
            throw new InvalidCredentialsException("Mail does not exist");
        }
        
        const isPasswordValid = await this.passwordHasher.compare(
            input.password,
            user.Password
        );

        if (isPasswordValid == false) {
            throw new InvalidCredentialsException("Password is incorrect");
        }

        const token = this.tokenProvider.generateToken({
            userId: user.Id,
            email: user.Email
        });
        
        return {
            token,
            user: {
                email: user.Email,
                name: user.Name
            }
        };
    }
}