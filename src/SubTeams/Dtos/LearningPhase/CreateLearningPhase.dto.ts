import { ApiProperty } from "@nestjs/swagger"
import { MaxLength, MinLength } from "class-validator"

export class CreateLearningPhaseDto
{
    @ApiProperty({
        maxLength:15,
        minLength:5,
        required:true
    })
    @MaxLength(15)
    @MinLength(5)
    Name:string

    @ApiProperty({
        maxLength:325,
        minLength:5,
        required:true
    })
    @MaxLength(325)
    @MinLength(5)
    Desc:string
}