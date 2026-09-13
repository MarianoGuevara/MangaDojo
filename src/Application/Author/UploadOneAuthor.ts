import { Author } from "../../Entities/Author";
import { IAuthorRepository } from "./IAuthorRepository";
import { DuplicateException } from "../../Entities/Exceptions/DuplicateException";

export interface UploadOneAuthorInputDTO {
    name: string;
    surname: string;
    nickname : string | null;
}

export interface UploadOneAuthorResponseDTO {
    id: number;
}

export class UploadOneAuthor {
    private authorRepository: IAuthorRepository;

    constructor(authorRepository: IAuthorRepository) {
        this.authorRepository = authorRepository;
    }

    async execute(authorDto: UploadOneAuthorInputDTO): Promise<UploadOneAuthorResponseDTO> {
        const author = new Author(
            authorDto.name,
            authorDto.surname,
            authorDto.nickname
        )

        const repositoryAuthor = await this.authorRepository.getByNameAndSurname(
            author.Name, 
            author.Surname
        );
        
        if (repositoryAuthor == null) {
            
            const savedAuthor = await this.authorRepository.insertOne(author);
            
            return {
                id: savedAuthor.Id
            };

        } else { throw new DuplicateException("The author already exists"); }
    }
}