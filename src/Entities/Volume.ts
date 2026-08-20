export class Volume {
    id: number;
    mangaId: number;
    number: number;
    price: number;
    stock: number;
    
    constructor(id: number, mangaId: number, number: number, price: number, stock: number) {
        this.id = id;
        this.mangaId = mangaId;
        this.number = number;
        this.price = price;
        this.stock = stock;
    }

    verifyStock(): boolean {
        return this.stock >= 0;
    }

    verifyStockShop(data: number): boolean {
        return this.stock > data;
    }
}