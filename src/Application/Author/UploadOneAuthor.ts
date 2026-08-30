import { Author } from "../../Entities/Author";
import { IAuthorRepository } from "./IAuthorRepository";
import { NotFoundException } from "../../Entities/Exceptions/NotFoundException";

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

        const repositoryAuthor = this.authorRepository.getByNameAndSurname(author.name, author.surname);
        
        if (repositoryAuthor != null) {
            
            const savedAuthor = await this.authorRepository.insertOne(author);
            
            return {
                id: savedAuthor.id
            };

        } else { throw new NotFoundException("The author already exists"); }
    }
}