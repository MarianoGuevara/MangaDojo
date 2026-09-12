import { IUserRepository } from "./IUserRepository";

export interface LoginUserInput {
    email: string;
    password: string;
}

export interface LoginUserOutput {
    token: string;
    user: {
        id: number;
        email: string;
        name: string;
    };
}

export class LoginUserUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
        // private readonly passwordHasher: PasswordHasher,
        // private readonly tokenProvider: TokenProvider
    ) {}

    async execute(input: LoginUserInput): Promise<LoginUserOutput> {
        // 1. Buscar si el usuario existe por email
        // 2. Verificar la contraseña ingresada contra el hash almacenado
        // 3. Generar el token de autenticación
        // 4. Retornar la respuesta esperada
        
        const user = await this.userRepository.findByEmail(input.email);
        // if (!user) {
        //     throw new InvalidCredentialsException();
        // }

        
        // const isPasswordValid = await this.passwordHasher.compare(
        //     input.password,
        //     user.passwordHash
        // );

        // if (!isPasswordValid) {
        //     throw new InvalidCredentialsException();
        // }

       
        // const token = this.tokenProvider.generateToken({
        //     userId: user.id,
        //     email: user.email
        // });

        
        // return {
        //     token,
        //     user: {
        //         id: user.id,
        //         email: user.email,
        //         name: user.name
        //     }
        // };
    }
}