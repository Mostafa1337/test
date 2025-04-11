import { IGenericRepo } from "src/Common/Generic/Contracts/IGenericRepo";
import { EntityBase } from "../../../Common/EntityBase";
import { DeleteResult, FindOptionsOrder, FindOptionsRelations, FindOptionsWhere, IsNull, QueryFailedError, Repository, UpdateResult } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException, Scope, UnprocessableEntityException } from "@nestjs/common";
import { LoggerMainService } from "src/logger/Logger.service";
import { Exception } from "bullmq";
import { Pagination } from "src/Common/Pagination/Pagination";
import { PaginationResponce } from "src/Common/Pagination/PaginationResponce.dto";

@Injectable({ scope: Scope.REQUEST })
export class GenericRepo<T extends EntityBase> implements IGenericRepo<T> {
    Repo: Repository<T>;

    constructor(
        protected readonly repo: Repository<T>,
        protected readonly logger:LoggerMainService
    ) { 
        this.Repo = repo;
    }

    async FindAll(options: FindOptionsWhere<T> | FindOptionsWhere<T>[]={},relations:FindOptionsRelations<T>={}): Promise<T[]> {
        const data = await this.repo.find({
            where:options,
            relations:relations,
        });

        return data
    }

    async FindAllPaginated(
        options: FindOptionsWhere<T> | FindOptionsWhere<T>[]={},
        relations:FindOptionsRelations<T>={},
        pagination?:Pagination,
    ) : Promise<PaginationResponce<T>> {
        const data = await this.repo.findAndCount({
            where:options,
            relations:relations,
            take:pagination.Take,
            skip:(pagination.Page - 1) * pagination.Take,
            order: { [pagination.SortField]: pagination.SortType.toLocaleUpperCase() } as FindOptionsOrder<T>,
        });

        return new PaginationResponce<T>(data[0],data[1]);
    }

    async FindOne(options: FindOptionsWhere<T> | FindOptionsWhere<T>[],relations:FindOptionsRelations<T>={}): Promise<T> {
        try {
            const data = await this.repo.findOne({
                where:options,
                relations:relations
            });
            return data
        } catch (err:any) {
            this.logger.Error({
                Error:err,
                FunctionName:"FindOne",
                StackTrace:err
            })
            this.ErrorFactory(err)
        }
    }

    async FindById(id: string,relations:FindOptionsRelations<T>={}): Promise<T> {
        const data = await this.FindOne({
            Id:id
        } as any,relations)

        return data
    }

    async Update(id: string, updatedData: Partial<T>,relations:FindOptionsRelations<T>={}): Promise<T> {
        try {
            updatedData.Id = id;
            const updateResult: UpdateResult = await this.repo.update({
                Id: id,
                //DeletedAt:IsNull()
            } as FindOptionsWhere<T>
                , updatedData as QueryDeepPartialEntity<T>);
    
            if (updateResult?.affected === 0) {
                throw new NotFoundException("Nothing to update")
            }
            
            return await this.FindById(id,relations);
        }
        catch (err:any) {
            this.logger.Error({
                Error:err,
                FunctionName:"Insert",
                StackTrace:err
            })
            this.ErrorFactory(err)
        }
    }

    UpdateRecursive() {
        throw new Error("Method not implemented.");
    }

    async Insert(dataToInsert: T,relations:FindOptionsRelations<T>={}): Promise<T> {
        let dataCreated = this.repo.create(dataToInsert);
        try {
            const insertedData = await this.repo.insert(dataCreated as QueryDeepPartialEntity<T>);
            dataCreated = await this.FindOne({
                Id:dataCreated.Id
            } as any,relations)
        }
        catch (err:any) {
            this.logger.Error({
                Error:err,
                FunctionName:"Insert",
                StackTrace:err
            })
            this.ErrorFactory(err)
        }

        return dataCreated;
    }

    InsertRecursive() {
        throw new Error("Method not implemented.");
    }

    InsertBulk() {
        throw new Error("Method not implemented.");
    }

    async Delete(id: string): Promise<void> {
        try {
            const deleteResult: DeleteResult = await this.repo.delete(id);
            if (deleteResult?.affected === 0) {
                throw new NotFoundException("Nothing to delete")
            }
        }
        catch (err:any) {
            this.logger.Error({
                Error:err,
                FunctionName:"Delete",
                StackTrace:err
            })
            this.ErrorFactory(err)
        }
    }

    async SoftDelete(): Promise<void> {

    }

    private ErrorFactory(err) {
        if (err instanceof QueryFailedError) {
            if (err.driverError.sqlState === '23000') {
                throw new ConflictException("Duplicate entry")
            }
            throw new UnprocessableEntityException("Check your data ant try again")
        }
        throw new InternalServerErrorException("Error has happened try again later")
    }
}