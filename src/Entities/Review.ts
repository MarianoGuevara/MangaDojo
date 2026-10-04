export class Review {
    private id: number;
    private mangaId: number;
    private userId: number;
    private comment: string;
    private rating: number;

    public get Id(): number {
        return this.id;
    }

    public get MangaId(): number {
        return this.mangaId;
    }

    public get UserId(): number {
        return this.userId;
    }

    public get Comment(): string {
        return this.comment;
    }

    public get Rating(): number {
        return this.rating;
    }

    constructor(id: number, mangaId: number, userId: number, comment: string, rating: number) {
        this.id = id;
        this.mangaId = mangaId;
        this.userId = userId;
        this.comment = comment;
        this.rating = rating;
    }
}