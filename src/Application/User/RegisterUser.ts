import { IUserRepository } from "./IUserRepository";
import { IHasher } from "../Shared/IHasher";
import { User } from "../../Entities/User";
import { Validator } from "../../Entities/Shared/Validator";
import { AlreadyExistsException } from "../../Entities/Exceptions/AlreadyExistsException";
import { ValidationException } from "../../Entities/Exceptions/ValidationException";

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

        //  password que contenga al menos una letra mayúscula, una letra minúscula, 
        // un número y un carácter especial
        const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/;
        if (!PASSWORD_REGEX.test(password)) {
            throw new ValidationException("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character");
        }
    }
}