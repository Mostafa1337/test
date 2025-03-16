import { IGenericRepo } from "src/Common/Generic/Contracts/IGenericRepo";
import { EntityBase } from "../../../Common/EntityBase";
import { DeleteResult, FindOptionsWhere, IsNull, QueryFailedError, Repository, UpdateResult } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException, Scope, UnprocessableEntityException } from "@nestjs/common";
import { LoggerMainService } from "src/logger/Logger.service";
import { Exception } from "bullmq";

@Injectable({ scope: Scope.REQUEST })
export class GenericRepo<T extends EntityBase> implements IGenericRepo<T> {
    constructor(
        protected readonly repo: Repository<T>,
        protected readonly logger:LoggerMainService
    ) { }

    async FindAll(): Promise<T[]> {
        const data = await this.repo.find();

        return data
    }

    FindAllPaginated() {
        throw new Error("Method not implemented.");
    }

    async FindOne(options: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T> {
        try {
            const data = await this.repo.findOneBy(options);
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

    async FindById(id: string): Promise<T> {
        const data = await this.repo.findOneBy(
            {
                Id: id,
                //DeletedAt:IsNull()
            } as FindOptionsWhere<T>,
        );

        return data
    }

    async Update(id: string, updatedData: Partial<T>): Promise<T> {
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
            
            return await this.FindById(id);
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

    async Insert(dataToInsert: T): Promise<T> {
        const dataCreated = this.repo.create(dataToInsert);
        try {
            const insertedData = await this.repo.insert(dataCreated as QueryDeepPartialEntity<T>);
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