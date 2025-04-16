import { AuthGuard } from "@nestjs/passport";
import { JwtStrategy } from "../Strategies/JWT.strategy";
import { ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class OptionalGuard extends AuthGuard("jwt")
{
    constructor(private readonly strategy: JwtStrategy) {
        super();
    }

    handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): TUser {
        // Don't throw an error if not authenticated
        if (err || !user) {
            return null; // or undefined, depending on how you want to handle it
        }
        return user;
    }
}