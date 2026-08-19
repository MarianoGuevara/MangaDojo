class Subscription {
    id: number;
    userId: number;
    price: number;
    startDate: Date;
    endDate: Date;
    
    constructor(id: number, userId: number, price: number, startDate: Date, endDate: Date) {
        this.id = id;
        this.userId = userId;
        this.price = price;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}