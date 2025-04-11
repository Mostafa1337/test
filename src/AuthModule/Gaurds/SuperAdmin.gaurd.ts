import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { TokenPayLoad } from "../Dtos/TokenPayload";

@Injectable()
export class SuperAdminGaurd implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        if(!request?.user)
        {
            return false
        }

        const tokenPayLoad:TokenPayLoad = request?.user;

        return tokenPayLoad?.IsSuperAdmin
    }

}