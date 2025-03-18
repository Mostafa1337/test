import { EntityBase } from "src/Common/EntityBase";
import { Pagination } from "src/Common/Pagination/Pagination";
import { PaginationResponce } from "src/Common/Pagination/PaginationResponce.dto";
import { FindOptionsRelations, FindOptionsWhere, Repository } from "typeorm";

export interface IGenericRepo<T extends EntityBase>{

    Repo: Repository<T>
    
    FindAll(options?: FindOptionsWhere<T> | FindOptionsWhere<T>[],relations?:FindOptionsRelations<T>):Promise<T[]>

    FindAllPaginated(
        options?: FindOptionsWhere<T> | FindOptionsWhere<T>[],
        relations?:FindOptionsRelations<T>,
        pagination?:Pagination,
    ) :  Promise<PaginationResponce<T>>

    FindOne(options: FindOptionsWhere<T> | FindOptionsWhere<T>[],relations?:FindOptionsRelations<T>):Promise<T>

    FindById(id:string,relations?:FindOptionsRelations<T>):Promise<T>

    Update(id:string,updatedData:Partial<T>,relations?:FindOptionsRelations<T>):Promise<T>

    UpdateRecursive()

    Insert(dataToInsert:T,relations?:FindOptionsRelations<T>):Promise<T>

    InsertRecursive()

    InsertBulk()

    Delete(id:string):Promise<void>

    SoftDelete():Promise<void>
}