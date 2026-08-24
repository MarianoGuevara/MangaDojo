interface IPresenter<T, U> { // T: Entity, U: DTO
    present(entity: T): U;
    presentToEntity(dto: U): T;
}