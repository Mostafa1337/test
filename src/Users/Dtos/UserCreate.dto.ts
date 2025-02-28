import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, MaxLength, IsNotEmpty, IsStrongPassword, ValidateIf } from "class-validator";
import { UserUpdateDto } from "./UserUpdate.dto";
import { PassDecorador } from "src/Common/Pass.decorador";
import { UserLoginDto } from "./UserLogin.dto";
import { BadValidationException, ClassValidatorExceptionDto } from "src/Common/ClassValidatorException.dto";

export class UserCreateDto extends UserUpdateDto
{
    @IsString()
    @IsEmail()
    @MaxLength(62)
    @IsNotEmpty()
    @ApiProperty({
        name: "Email",
        maxLength: 62,
        type: "string",
        nullable: false,
        required: true
    })
    @AutoMap()
    Email: string;

    @IsString({ message: "Enter a valid password" })
    @IsNotEmpty({ message: "Enter a valid password" })
    @IsStrongPassword({ minLength: 8, minLowercase: 0, minNumbers: 0, minSymbols: 0, minUppercase: 0 }, { message: "Enter a valid password" })
    @MaxLength(20, { message: "Enter a valid password" })
    @ApiProperty({
        name: "Password",
        type: "string",
        nullable: false,
        required: true,
        minLength: 7,
        maxLength: 20,
    })
    @AutoMap()
    Password: string;

    @PassDecorador()
    @ValidateIf((x:UserCreateDto)=> {
        const isValidConfirmPass:boolean = x.ConfirmPassword === x.Password
        if(!isValidConfirmPass)
        {
            throw new BadValidationException(new ClassValidatorExceptionDto("Confirm Password Doesn't match Password","ConfirmPassword"))
        }
        return isValidConfirmPass
    })
    @AutoMap()
    ConfirmPassword: string;
}
