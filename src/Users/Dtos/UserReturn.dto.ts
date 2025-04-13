import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { Usertypes } from "../Models/Usertype";
import { Expose, Transform } from "class-transformer";
import { EntityBase } from "src/Common/EntityBase";

export class UserReturnDto extends EntityBase{
    @ApiProperty({
        name:"FirstName",
        type:"string",
    })
    @AutoMap()
    FirstName:string
    

    @ApiProperty({
        name:"LastName",
        type:"string",
    })
    @AutoMap()
    LastName:string
    
    @ApiProperty({
        name:"Email",
        type:"string",
    })
    @AutoMap()
    Email: string;

    @ApiProperty({
        name:"StudentId",
        type:"string",
    })
    @AutoMap()
    StudentId?: string = null;
    

    @ApiProperty({
        name:"PhoneNumber",
        type:"string",
    })
    @AutoMap()
    PhoneNumber: string;

    @ApiProperty({
        name:"Usertype",
        type:"string",
        enum:(Object.values(Usertypes).filter(x=> typeof x === "string")),
    })
    @AutoMap()
    Usertype: string;


    @ApiProperty({
        name:"ProfilePhoto",
        type:"string",
    })
    @AutoMap()
    ProfilePhoto: string;
}