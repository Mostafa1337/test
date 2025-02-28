import { Injectable, Scope } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { ExtractJwt, StrategyOptionsWithoutRequest } from 'passport-jwt';

const  privateKey = fs.readFileSync(path.join(__dirname, '../../../private.pem'), 'utf8')
const publicKey = fs.readFileSync(path.join(__dirname, '../../../public.pem'), 'utf8')
@Injectable()
export class JwtConfigService {
    private keys: { privateKey: string; publicKey: string } = null;

    constructor() {
        this.LoadKeys();
    }

    private async LoadKeys() {
        this.keys = {
           privateKey:privateKey,
           publicKey:publicKey
        };
    }

    public GetKeys() {
        return this.keys;
    }

    public GetConfig() : StrategyOptionsWithoutRequest
    {
        return {
                    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                    issuer: "bridgex.com",
                    secretOrKey: this.GetKeys().publicKey,
                    algorithms: ["RS256"],
                    audience:"bridgex.com",
                    ignoreExpiration:false,
                    passReqToCallback:false,
                }
    }
}