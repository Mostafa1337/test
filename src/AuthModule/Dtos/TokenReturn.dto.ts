import { ApiProperty } from "@nestjs/swagger"
import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface"
import { UserReturnDto } from "src/Users/Dtos/UserReturn.dto"

export class TokenReturnDto {
    @ApiProperty({
        name:"JWT",
        type:"string",
    })
    readonly JWT: string

    @ApiProperty({
        name:"CreatedAt",
        type:Date,
    })
    readonly CreatedAt: Date

    @ApiProperty({
        name:"ExpireDate",
        type:Date,
    })
    readonly ExpireDate: Date

    @ApiProperty({
        name:"User",
        type:UserReturnDto,
    })
    readonly User: UserReturnDto
    
    constructor(
        JWT: string,
        CreatedAt: Date,
        ExpireDate: Date,
        User: UserReturnDto
    ) {
        this.JWT = JWT
        this.CreatedAt = CreatedAt
        this.ExpireDate = ExpireDate
        this.User = User
    }
}