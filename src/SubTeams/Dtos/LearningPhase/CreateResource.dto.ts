import { ApiProperty } from "@nestjs/swagger";
import { MaxLength, MinLength } from "class-validator";

export class CreateResourceDto {
    @ApiProperty({
        maxLength: 15,
        minLength: 5,
        required: true
    })
    @MaxLength(15)
    @MinLength(5)
    Name: string
}