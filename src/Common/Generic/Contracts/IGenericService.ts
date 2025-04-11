import { EntityBase } from "src/Common/EntityBase";
import { FindOptionsWhere } from "typeorm";

export interface IGenericService<T extends EntityBase> {
    FindAll(): Promise<T[]>

    FindAllPaginated()

    FindOne(options: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T>

    FindById(id: string): Promise<T>

    Update(id: string, updatedData: Partial<T>): Promise<T>

    UpdateRecursive()

    Insert(dataToInsert: T): Promise<T>

    InsertRecursive()

    InsertBulk()

    Delete(id: string): Promise<void>

    SoftDelete(): Promise<void>
}