import { AuthGuard } from "@nestjs/passport";
import { JwtStrategy } from "../Strategies/JWT.strategy";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JWTGaurd extends AuthGuard("jwt"){
    constructor(private readonly strategy: JwtStrategy) {
        super();
    }
}