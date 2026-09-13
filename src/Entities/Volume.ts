export class Volume {
    private _id: number;
    private _mangaId: number;
    private _number: number;
    private _price: number;
    private _stock: number;

    public get Id(): number {
        return this._id;
    }

    public get MangaId(): number {
        return this._mangaId;
    }

    public get Number(): number {
        return this._number;
    }

    public get Price(): number {
        return this._price;
    }

    public get Stock(): number {
        return this._stock;
    }

    constructor(id: number, mangaId: number, number: number, price: number, stock: number) {
        this._id = id;
        this._mangaId = mangaId;
        this._number = number;
        this._price = price;
        this._stock = stock;
    }

    verifyStock(): boolean {
        return this._stock >= 0;
    }

    verifyStockShop(data: number): boolean {
        return this._stock > data;
    }
}