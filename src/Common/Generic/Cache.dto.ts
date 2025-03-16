export interface ICacheDto<T>
{
    TimeInSeconds:number
    ObjectToAdd:T
}

export interface ICacheTimeDto
{
    TimeInSeconds:number
}

export class CacheDto<T>
{
    TimeInSeconds?:number
    Key:string
    ObjectToAdd?:T

    constructor(add:ICacheDto<T> =null,...Key:string[])
    {
        this.Key = Key.join(":")
        if(add)
        {
            this.TimeInSeconds = add.TimeInSeconds
            this.ObjectToAdd = add?.ObjectToAdd
        }
    }
}