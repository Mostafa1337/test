import { HttpException, HttpStatus } from "@nestjs/common"
import { ApiProperty } from "@nestjs/swagger"

export class ClassValidatorExceptionDto<T> {

    @ApiProperty()
    public Error: string

    @ApiProperty()
    public Field: keyof T

    constructor(Error: string, Field: keyof T) {
        this.Error = Error
        this.Field = Field
    }
}

export class BadValidationException<T> extends HttpException 
{
    constructor(data:ClassValidatorExceptionDto<T>,statusCode:HttpStatus=HttpStatus.BAD_REQUEST){
        super({Data:[data]},statusCode)

        this.message = "Please Enter Valid Data"
        this.name = "BadValidationException"
    }
}