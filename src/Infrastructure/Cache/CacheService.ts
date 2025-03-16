import { InjectRedis } from "@nestjs-modules/ioredis";
import { Injectable, Scope } from "@nestjs/common";
import Redis from "ioredis";
import { CacheDto } from "src/Common/Generic/Cache.dto";
import { ICacheService } from "src/Common/Generic/Contracts/ICacheService";

@Injectable({scope:Scope.REQUEST})
export class CacheService  implements ICacheService
{
    constructor(@InjectRedis() private readonly redis: Redis) { }

    async SetSet(dto: CacheDto<string>): Promise<void> {
        await this.redis.set(dto.Key, dto.ObjectToAdd)
        await this.ExpireKey(dto as unknown as CacheDto<void>)
    }

    async GetSet(dto: CacheDto<string>): Promise<string> {
        const exists = await  this.redis.exists(dto.Key);
        if(!exists)
            return null;

        return await this.redis.get(dto.Key)
    }

    async SetHashSet<T>(dto: CacheDto<T>): Promise<void> {
        await this.redis.hset(dto.Key, dto.ObjectToAdd as Object)
        await this.ExpireKey(dto as unknown as CacheDto<void>)
    }

    async GetHashSet<T>(dto: CacheDto<T>): Promise<T> {
        const exists = await  this.redis.exists(dto.Key);
        if(!exists)
            return null;

        return await this.redis.hgetall(dto.Key) as unknown as T
    }

    async AddToList(dto: CacheDto<string>): Promise<void> {
        await this.redis.lpush(dto.Key, dto.ObjectToAdd);
        await this.ExpireKey(dto as unknown as CacheDto<void>)
    }

    async GetAllList(dto: CacheDto<string>): Promise<string[]> {
        const exists = await  this.redis.exists(dto.Key);
        if(!exists)
            return null;
        
        return await this.redis.lrange(dto.Key, 0, -1);
    }

    async RemoveFromList(dto: CacheDto<string>): Promise<void> {
        if (!dto.ObjectToAdd) {
            await this.DeleteKey(dto as unknown as CacheDto<void>)
            return;
        }
        await this.redis.lrem(dto.Key, 0, dto.ObjectToAdd);
    }

    async DeleteKey(dto: CacheDto<void>): Promise<void> {
        await this.redis.del(dto.Key);
    }

    async ExpireKey(dto: CacheDto<void>): Promise<void> {
        await this.redis.expire(dto.Key, dto.TimeInSeconds);
    }
}

export const CacheProvider ={
    provide: ICacheService,
    useClass: CacheService,
}