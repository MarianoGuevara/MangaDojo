export interface IMapper<T, U> { // T: Entity, U: DTO
    map(entity: T): U;
}