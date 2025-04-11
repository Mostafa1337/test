import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtConfigService } from "./Services/JwtConfig.service";
import { JwtStrategy } from "./Strategies/JWT.strategy";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { CacheModule } from "src/Infrastructure/Cache/Cache.module";
import { AuthService } from "./Services/Auth.service";
import { VerificationService } from "./Services/Verification.service";
import { EncryptionService } from "./Services/Encryption.service";

@Module({
    imports:[ConfigModule,PassportModule,JwtModule,CacheModule],
    providers:[JwtConfigService,JwtStrategy,AuthService,VerificationService,EncryptionService],
    exports:[AuthService,VerificationService]
})
export class AuthModule{}