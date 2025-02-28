import { ConflictException, GoneException, HttpException, Inject, Injectable, NotFoundException, Scope, UnauthorizedException, UnprocessableEntityException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ICacheService } from "src/Common/Generic/Contracts/ICacheService";
import { CacheDto } from "src/Common/Generic/Cache.dto";
import { ResetPassData } from "../Dtos/ResetPassData";
import { randomInt } from "crypto";
import * as bcrypt from 'bcrypt';
import { RedisRestsPassKey } from "../Dtos/RedisRestsPassKey";

@Injectable({scope:Scope.REQUEST})
export class ResetPassService{
    private readonly ResetPassException:HttpException = new UnauthorizedException(`Invalid Code`)
    private readonly ttl:number = parseFloat(this.configService.getOrThrow<string>("RESETPASSCODETTLINMINUTES"))

    constructor(
        private readonly configService:ConfigService,
        @Inject(ICacheService)
        private readonly cacheService:ICacheService
    ) {}

    async GetResetPassCode(email:string,userId:string):Promise<number>
    {
        const oldResetPass:ResetPassData = await this.cacheService.GetHashSet<ResetPassData>(new CacheDto(null,RedisRestsPassKey,email));
        
        const code = randomInt(1000, 9999);
        const codeHashed = await bcrypt.hash(code.toString(),await bcrypt.genSalt())

        if( oldResetPass )
        {
            const timeToSendAgain:number = parseFloat(this.configService.getOrThrow<string>("RESETPASSNEXTTRYINSECONDS"))

            oldResetPass.Retries = parseInt(oldResetPass.Retries.toString());
            let secondsToAdd:number = timeToSendAgain * Math.pow(2, oldResetPass.Retries - 1)
            if(secondsToAdd > (this.ttl * 60))
                secondsToAdd = this.ttl * 60

            let sendCodeAgainDate = new Date(oldResetPass.CreatedAt)
            sendCodeAgainDate.setSeconds(sendCodeAgainDate.getSeconds() + secondsToAdd)  
            
            if(sendCodeAgainDate > new Date())
            {
                throw new ConflictException(
                    `Wait ${Math.floor((sendCodeAgainDate.getTime() - new Date().getTime()) / 1000)} Seconds to send again`
                )
            }
            else
            {
                let resetPass:ResetPassData = new ResetPassData(userId,codeHashed)
                resetPass.Retries = oldResetPass.Retries + 1;

                await this.cacheService.SetHashSet(new CacheDto({
                    ObjectToAdd: resetPass,
                    TimeInSeconds: this.ttl * 60
                },RedisRestsPassKey,email)) 
                
                return code;
            }
        }


        const resetPass:ResetPassData = new ResetPassData(userId,codeHashed)
        await this.cacheService.SetHashSet(new CacheDto({
            ObjectToAdd: resetPass,
            TimeInSeconds: this.ttl * 60
        },RedisRestsPassKey,email))   

        return code;
    }

    async VerifyResetPassCode(email:string,code:number) : Promise<string>
    {
        const oldResetPass:ResetPassData = await  this.IsValidKey(email)

        const isCodeRight = await bcrypt.compare(code.toString(),oldResetPass.CodeHashed);
        if(!isCodeRight)
        {
            throw this.ResetPassException
        }

        return oldResetPass.Token
    }

    async VerifyResetPassToken(email:string,token:string) : Promise<string>
    {
        const oldResetPass:ResetPassData = await  this.IsValidKey(email)

        if(token !== oldResetPass.Token)
        {
            throw this.ResetPassException
        }

        await this.cacheService.DeleteKey(new CacheDto(null,RedisRestsPassKey,email))
        return oldResetPass.UserId;
    }

    private async IsValidKey(email:string) : Promise<ResetPassData>
    {
        const oldResetPass:ResetPassData = 
            await this.cacheService.GetHashSet<ResetPassData>(new CacheDto(null,RedisRestsPassKey,email));

        
        if(!oldResetPass)
        {
            throw new GoneException("Expired code")
        }

        if(!oldResetPass.UserId)
        {
            throw this.ResetPassException
        }

        let currentDate = new Date(oldResetPass.CreatedAt)
        currentDate.setMinutes(currentDate.getMinutes() + this.ttl)
        if(currentDate < new Date())
        {
            throw new GoneException("Expired code")
        }

        return oldResetPass;
    }
}