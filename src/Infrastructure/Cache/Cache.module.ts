import { RedisModule, RedisModuleOptions } from "@nestjs-modules/ioredis";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CacheProvider } from "./CacheService";

@Module({
    imports: [
        ConfigModule,
        RedisModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                type: "single",
                url: configService.getOrThrow("REDISURL")
            }) as RedisModuleOptions,
        })
    ],
    providers:[CacheProvider],
    exports:[CacheProvider]
})
export class CacheModule { }