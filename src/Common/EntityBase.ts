import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { randomBytes } from "crypto"

export abstract class EntityBase{
    @ApiProperty()
    @AutoMap()
    Id:string = randomBytes(16).toString("hex");
    
    @Exclude()
    @AutoMap()
    CreatedAt!:Date;

    @Exclude()
    UpdatedAt!:Date;

    //DeletedAt?: Date;
}