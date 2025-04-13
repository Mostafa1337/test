import { ConflictException, GoneException, HttpException, Inject, Injectable, NotFoundException, Scope, Type, UnauthorizedException, UnprocessableEntityException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ICacheService } from "src/Common/Generic/Contracts/ICacheService";
import { CacheDto } from "src/Common/Generic/Cache.dto";
import { randomInt } from "crypto";
import * as bcrypt from 'bcrypt';
import { VerificationCacheKeys, VerificationType } from "../Dtos/VerificationType";
import { VerificationData, VerificationDataWithCode } from "../Dtos/VerificationData";
import { plainToInstance } from "class-transformer";
import { EncryptionService } from "./Encryption.service";

@Injectable({ scope: Scope.REQUEST })
export class VerificationService {
    private readonly ResetPassException: HttpException = new UnauthorizedException(`Invalid Code`)
    private readonly ttl: number;

    constructor(
        private readonly configService: ConfigService,
        private readonly encryptService:EncryptionService,
        @Inject(ICacheService)
        private readonly cacheService: ICacheService
    ) { 
        this.ttl = parseFloat(this.configService.getOrThrow<string>("CODETTLINMINUTES"))
    }

    /**
     * Sends a verification code to the specified email
     * @param email - The email address to send the code to
     * @param userId - The ID of the user requesting the code
     * @param verifyType - The type of verification from VerificationCacheKeys
     * @returns Promise<number> - The generated verification code
     */
    async SendCode(email: string, userId: string, verifyType: VerificationCacheKeys): Promise<number> {
        return await this.SaveVerifyData(email,userId,verifyType,VerificationType.CODE,VerificationDataWithCode) as number
    }

    /**
     * Generates and sends a verification token
     * @param email - The email address to associate with the token
     * @param userId - The ID of the user requesting the token
     * @param verifyType - The type of verification from VerificationCacheKeys
     * @returns Promise<string> - The generated verification token
     */
    async SendToken(email: string, userId: string, verifyType: VerificationCacheKeys): Promise<string> {
        return await this.SaveVerifyData(email,userId,verifyType,VerificationType.TOKEN,VerificationData) as string
    }

    /**
     * Verifies a submitted code against stored verification data
     * @param email - The email address associated with the code
     * @param code - The verification code to validate
     * @param verifyType - The type of verification from VerificationCacheKeys
     * @returns Promise<string> - The token generated upon successful verification
     * @throws UnauthorizedException if code is invalid
     * @throws GoneException if code is expired
     */
    async VerifyCode(email: string, code: number, verifyType: VerificationCacheKeys): Promise<string> {
        const oldVerificationData: VerificationDataWithCode = await this.IsValidKey(email, verifyType,VerificationDataWithCode)

        if (!await oldVerificationData.IsValidate(code.toString())) {
            throw this.ResetPassException
        }

        return oldVerificationData.GetToken(this.encryptService)
    }

    /**
     * Verifies a submitted token against stored verification data
     * @param email - The email address associated with the token
     * @param token - The token to validate
     * @param verifyType - The type of verification from VerificationCacheKeys
     * @returns Promise<string> - The userId associated with the token
     * @throws UnauthorizedException if token is invalid
     * @throws GoneException if token is expired
     */
    async VerifyToken(email: string, token: string, verifyType: VerificationCacheKeys): Promise<string> {
        const oldVerificationData: VerificationData = await this.IsValidKey(email, verifyType,VerificationData)

        const tokenIsValid = await oldVerificationData.IsValidate(token,this.encryptService)
        if (!tokenIsValid) {
            throw this.ResetPassException
        }

        await this.cacheService.DeleteKey(new CacheDto(null, verifyType, email))
        return oldVerificationData.UserId;
    }

    /**
     * Saves verification data and handles retry logic
     * @param email - The email address for the verification
     * @param userId - The ID of the user
     * @param verifyCache - The cache key type
     * @param verifyType - The type of verification (CODE or TOKEN)
     * @param type - The class type for verification data
     * @returns Promise<string | number> - The generated code or token
     * @throws ConflictException if retry attempt is too soon
     */
    private async SaveVerifyData<T extends VerificationData>
        (
            email: string,
            userId: string,
            verifyCache: VerificationCacheKeys,
            verifyType: VerificationType,
            type:Type<T>
        ): Promise<string | number> {
        const oldVerificationData: T =
            plainToInstance(type,await this.cacheService.GetHashSet<T>(new CacheDto(null, verifyCache, email)));

        if (oldVerificationData) {
            const timeToSendAgain: number = parseFloat(this.configService.getOrThrow<string>("NEXTTRYINSECONDS"))

            oldVerificationData.Retries 
                = oldVerificationData.Retries ? parseInt(oldVerificationData.Retries.toString()) : 1;
            let secondsToAdd: number = timeToSendAgain * Math.pow(2, oldVerificationData.Retries - 1)
            if (oldVerificationData.Retries >= 5)
                secondsToAdd = this.ttl * 60

            let sendCodeAgainDate = new Date(oldVerificationData.CreatedAt)
            sendCodeAgainDate.setSeconds(sendCodeAgainDate.getSeconds() + secondsToAdd)

            if (sendCodeAgainDate > new Date()) {
                throw new ConflictException(
                    `Wait ${Math.floor((sendCodeAgainDate.getTime() - new Date().getTime()) / 1000)} Seconds to send again`
                )
            }
            else {
                return await this.SaveAndGetCode(email,userId,verifyCache,verifyType,oldVerificationData.Retries);
            }
        }

        return await this.SaveAndGetCode(email,userId,verifyCache,verifyType);
    }

    /**
     * Generates and saves new verification data
     * @param email - The email address for the verification
     * @param userId - The ID of the user
     * @param verifyCache - The cache key type
     * @param verifyType - The type of verification (CODE or TOKEN)
     * @param reties - Number of retry attempts
     * @returns Promise<T> - The generated code or token
     */
    private async SaveAndGetCode<T = string | number>(
        email: string,
        userId: string,
        verifyCache: VerificationCacheKeys,
        verifyType: VerificationType,
        reties:number=1
    ) :Promise<T>{

        let verificationData: VerificationDataWithCode | VerificationData;
        if(verifyType=== VerificationType.CODE)
        {
            verificationData = new VerificationDataWithCode(userId)
        }else
        {
            verificationData = new VerificationData(userId)
        }
        const codeOrToken:T = await verificationData.GenerateData(this.encryptService) as T;
        
        await verificationData.AddRetries(reties)
        
        await this.cacheService.SetHashSet(new CacheDto({
            ObjectToAdd: verificationData,
            TimeInSeconds: this.ttl * 60
        }, verifyCache, email))

        return codeOrToken;
    }

    /**
     * Validates if a verification key exists and is still valid
     * @param email - The email address to check
     * @param verifyType - The type of verification from VerificationCacheKeys
     * @param type - The class type for verification data
     * @returns Promise<T> - The verification data if valid
     * @throws GoneException if code is expired or not found
     * @throws UnauthorizedException if userId is missing
     */
    private async IsValidKey<T extends VerificationData>(
        email: string, 
        verifyType: VerificationCacheKeys,
        type:Type<T>
    ): Promise<T> {
        const oldVerificationData: T =
            await this.cacheService.GetHashSet<T>(new CacheDto(null, verifyType, email));


        if (!oldVerificationData) {
            throw new GoneException("Expired code")
        }

        if (!oldVerificationData.UserId) {
            throw this.ResetPassException
        }

        let currentDate = new Date(oldVerificationData.CreatedAt)
        currentDate.setMinutes(currentDate.getMinutes() + this.ttl)
        if (currentDate < new Date()) {
            throw new GoneException("Expired code")
        }

        return plainToInstance(type,oldVerificationData);
    }
}