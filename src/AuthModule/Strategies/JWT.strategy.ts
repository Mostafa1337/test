import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtConfigService } from "../Services/JwtConfig.service";
import { Injectable } from "@nestjs/common";
import { TokenPayLoad } from "../Dtos/TokenPayload";

// alg" Param Value	Digital Signature or MAC Algorithm	Implementation Requirements
// Symmetric HMAC		
// HS256	HMAC using SHA-256	Required
// HS384	HMAC using SHA-384	Optional
// HS512	HMAC using SHA-512	Optional
// RSA-based		
// RS256	RSASSA-PKCS1-v1_5 using SHA-256	Recommended
// RS384	RSASSA-PKCS1-v1_5 using SHA-384	Optional
// RS512	RSASSA-PKCS1-v1_5 using SHA-512	Optional
// Elliptic-curve		
// ES256	ECDSA using P-256 and SHA-256	Recommended-
// ES384	ECDSA using P-384 and SHA-384	Optional
// ES512	ECDSA using P-521 and SHA-512	Optional
// Probabilistic signature scheme		
// PS256	RSASSA-PSS using SHA-256 and MGF1 with SHA-256	Optional
// PS384	RSASSA-PSS using SHA-384 and MGF1 with SHA-384	Optional
// PS512	RSASSA-PSS using SHA-512 and MGF1 with SHA-512	Optional
// Horribly insecure		
// none	No digital signature or MAC performed	Optional
//https://stackoverflow.com/questions/51489637/what-are-the-differences-between-jwt-rs256-rs384-and-rs512-algorithms

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
    constructor(private readonly jwtKeyService:JwtConfigService){
        super(jwtKeyService.GetConfig());
    }

    validate(payload: {payload:TokenPayLoad}): TokenPayLoad {
        return payload.payload;
    }
}