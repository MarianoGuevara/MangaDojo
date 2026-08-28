export interface IMapperDouble<T, U> { // T: Entity, U: DTO
    map(entity: T): U;
    mapToEntity(dto: U): T;
}