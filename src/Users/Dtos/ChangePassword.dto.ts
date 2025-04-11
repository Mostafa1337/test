import { AutoMap } from "@automapper/classes";
import { ValidateIf } from "class-validator";
import { BadValidationException, ClassValidatorExceptionDto } from "src/Common/ClassValidatorException.dto";
import { PassDecorador } from "src/Common/Pass.decorador";

export class ChangePasswordDto
{
    @PassDecorador()
    @AutoMap()
    NewPassword: string;

    @PassDecorador()
    @ValidateIf((x:ChangePasswordDto)=> {
        const isValidConfirmPass:boolean = x.ConfirmPassword === x.NewPassword
        if(!isValidConfirmPass)
        {
            throw new BadValidationException(
                new ClassValidatorExceptionDto("Confirm Password Doesn't match Password","ConfirmPassword")
            )
        }
        return isValidConfirmPass
    })
    @AutoMap()
    ConfirmPassword: string;
}
