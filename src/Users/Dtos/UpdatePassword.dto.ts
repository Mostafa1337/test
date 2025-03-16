import { AutoMap } from "@automapper/classes";
import { PassDecorador } from "src/Common/Pass.decorador";
import { ChangePasswordDto } from "./ChangePassword.dto";

export class UpdatePasswordDto extends ChangePasswordDto
{
    @PassDecorador()
    @AutoMap()
    OldPassword: string;
}