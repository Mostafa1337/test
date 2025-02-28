import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { TokenPayLoad } from "./Dtos/TokenPayload";

export const CurrentUserDecorator = createParamDecorator((_data: unknown, context: ExecutionContext): TokenPayLoad =>{
    return context.switchToHttp().getRequest()?.user;
})