import { ConflictException, NotFoundException } from "@nestjs/common";
import { EntityBase } from "../EntityBase";
import { IGenericRepo } from "./Contracts/IGenericRepo";
import { IGenericService } from "./Contracts/IGenericService";
import { FindOptionsWhere } from "typeorm";

export abstract class GenericService<T extends EntityBase> implements IGenericService<T>
{
    NotFoundException:string = "Not Found"

    constructor(
        protected readonly repo:IGenericRepo<T>)
    {}

    async FindAll(): Promise<T[]> {
        return await this.repo.FindAll();
    }

    FindAllPaginated() {
        throw new Error("Method not implemented.");
    }
    async FindOne(options: FindOptionsWhere<T> | FindOptionsWhere<T>[],throwErrorIfNull:boolean=true):Promise<T> {
        try
        {
            const data= await this.repo.FindOne(options);
            if(throwErrorIfNull && !data)
            {
                throw new NotFoundException();
            }
            return data;
        }catch(err)
        {
            this.ErrorFactory(err)
        }
    }

    async FindById(id: string,throwErrorIfNull:boolean=true): Promise<T> {
        try
        {
            const data= await this.repo.FindById(id);
            if(throwErrorIfNull && !data)
            {
                throw new NotFoundException();
            }
            return data;
        }catch(err)
        {
            this.ErrorFactory(err)
        }
    }

    async Update(id: string, updatedData: Partial<T>): Promise<T> {
        try
        {
            return await this.repo.Update(id,updatedData);
        }catch(err)
        {
            this.ErrorFactory(err)
        }
    }

    UpdateRecursive() {
        throw new Error("Method not implemented.");
    }
    
    async Insert(dataToInsert: T): Promise<T> {
        try
        {
            return await this.repo.Insert(dataToInsert);
        }catch(err)
        {
            this.ErrorFactory(err)
        }
    }

    InsertRecursive() {
        throw new Error("Method not implemented.");
    }
    InsertBulk() {
        throw new Error("Method not implemented.");
    }

    async Delete(id: string): Promise<void> {
        await this.repo.Delete(id);
    }

    SoftDelete(): Promise<void> {
        throw new Error("Method not implemented.");
    }


    public ErrorFactory(err:any)
    {
        if(err instanceof NotFoundException)
        {
            throw new NotFoundException(this.NotFoundException);
        }
        throw err;
    }
} 