import { IUserRepository } from "./IUserRepository";
import { IHasher } from "../Shared/IHasher";
import { User } from "../../Entities/User";
import { Validator } from "../../Entities/Shared/Validator";
import { AlreadyExistsException } from "../../Entities/Exceptions/AlreadyExistsException";

export interface RegisterUserInput {
    name: string;
    surname: string;
    nickname: string;
    email: string;
    password: string;
    role: Role;
}

export interface RegisterUserOutput {
    id: number;
    nickname: string;
    email: string;
}

export class RegisterUserUseCase {
    private userRepository: IUserRepository;
    private passwordHasher: IHasher;
    constructor(
         userRepository: IUserRepository,
         passwordHasher: IHasher
    ) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
    }

    async execute(input: RegisterUserInput): Promise<RegisterUserOutput> {
        // 1. Validar que no exista un usuario registrado con ese email
        // 2. Hashear la contraseña en texto plano
        // 3. Crear la entidad de Dominio User (acá se ejecutan sus validaciones internas, ej. formato de email)
        // 4. Persistir el usuario en el Repositorio
        // 5. Retornar el DTO (cuando se registre el user debe iniciar sesion para token luego)

        const existingUser = await this.userRepository.findByEmail(input.email);

        if (existingUser != undefined) {
            throw new AlreadyExistsException(`User with email ${input.email} already exists`);
        }

        this.validatePassword(input.password);

        const passwordHash = await this.passwordHasher.hash(input.password);

         const newUser = new User(
            0, // Id fanstasma, ya que se genera en la base de datos
            input.name,
            input.surname,
            input.nickname,
            input.email,
            passwordHash,
            new Date(),
            input.role
        );

        const savedUser = await this.userRepository.save(newUser);

        return {
            id: savedUser.Id,
            nickname: savedUser.Nickname,
            email: savedUser.Email,
        };
    }

    private validatePassword(password: string): void {
        Validator.validateType("string", password);
        Validator.stringMin(password, "password", 8);
        Validator.stringMax(password, "password", 30);

        // validar que password plana tenga nums o algo copado
    }
}