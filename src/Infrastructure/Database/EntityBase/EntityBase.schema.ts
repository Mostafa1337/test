import { EntitySchema, EntitySchemaOptions } from "typeorm";
import { EntityBaseSchemaColumns } from "./EntityBaseSchemaColumns";
import { EntityBase } from "src/Common/EntityBase";

export class EntityBaseSchema<T extends EntityBase> extends EntitySchema<T>{
    constructor(options: EntitySchemaOptions<T>){
        super({
            ...options,
            columns:{
                ...options.columns,
                Id: {
                    type: "varchar",
                    length:32,
                    primary: true,
                },
                CreatedAt: {
                    type: Date,
                    createDate: true,
                },
                UpdatedAt: {
                    type: Date,
                    updateDate: true,
                },
                // DeletedAt:{
                //     type:Date,
                //     deleteDate:true
                // }
            }
        })
    }
}