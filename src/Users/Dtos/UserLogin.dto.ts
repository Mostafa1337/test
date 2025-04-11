import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, MaxLength, IsNotEmpty, IsStrongPassword, IsEmpty, IsOptional, ValidateIf } from "class-validator";
import { Users } from "../Models/Users.entity";
import { PassDecorador } from "src/Common/Pass.decorador";

export class UserLoginDto implements Partial<Users> {
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

    @PassDecorador()
    @AutoMap()
    Password: string;
}