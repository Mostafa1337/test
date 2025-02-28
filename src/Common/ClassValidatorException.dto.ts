import { HttpException } from "@nestjs/common"
import { ApiProperty } from "@nestjs/swagger"

export class ClassValidatorExceptionDto {

    @ApiProperty()
    public Error: string

    @ApiProperty()
    public Field: string

    constructor(Error: string, Field: string) {
        this.Error = Error
        this.Field = Field
    }
}

export class BadValidationException extends HttpException 
{
    constructor(data:ClassValidatorExceptionDto){
        super({Data:[data]},400)

        this.message = "Please Enter Valid Data"
        this.name = "BadRequestException"
    }
}