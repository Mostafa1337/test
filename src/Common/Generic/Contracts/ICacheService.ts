import { CacheDto } from "../Cache.dto";


export interface ICacheService
{
    SetHashSet<T>(dto:CacheDto<T>):Promise<void>

    GetHashSet<T>(dto:CacheDto<T>): Promise<T>

    SetSet(dto:CacheDto<string>):Promise<void>

    GetSet(dto:CacheDto<string>): Promise<string>
    
    AddToList(dto:CacheDto<string>):Promise<void>

    GetAllList(dto:CacheDto<string>): Promise<string[]>

    RemoveFromList(dto:CacheDto<string>): Promise<void>

    DeleteKey(dto:CacheDto<void>): Promise<void>

    ExpireKey(dto:CacheDto<void>):Promise<void>
}

export const ICacheService =  Symbol("ICacheService");