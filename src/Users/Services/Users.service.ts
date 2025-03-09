import { GenericService } from "src/Common/Generic/GenericService";
import { Users } from "../Models/Users.entity";
import { IGenericRepo } from "src/Common/Generic/Contracts/IGenericRepo";
import { BadRequestException, Inject, Injectable, NotFoundException, Scope, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from "../Dtos/UserLogin.dto";
import { AuthService } from "src/AuthModule/Services/Auth.service";
import { TokenReturnDto } from "src/AuthModule/Dtos/TokenReturn.dto";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { UserReturnDto } from "../Dtos/UserReturn.dto";
import { UpdatePasswordDto } from "../Dtos/UpdatePassword.dto";
import { VerificationService } from "src/AuthModule/Services/Verification.service";
import { INotification } from "src/Common/Generic/Contracts/INotificationService";
import { ResetPassTokenDto } from "../Dtos/ResetPassDtos";
import { use } from "passport";
import { VerificationCacheKeys } from "src/AuthModule/Dtos/VerificationType";
import { VerifyError } from "../Errors/VerifyError";

@Injectable({scope:Scope.REQUEST})
export class UsersService extends GenericService<Users>
{

    constructor(
        @Inject("REPO_USERS")
        private readonly userRepo:IGenericRepo<Users>,
        private readonly authService:AuthService,
        private readonly resetPassService:VerificationService,
        @InjectMapper()
        private readonly mapper:Mapper,
        @Inject(INotification)
        private readonly notificationService:INotification
    ) {
        super(userRepo)
    }

    ConflictException: string = "This user already exist";
    NotFoundException: string = "This User not found";

    async Insert(dataToInsert: Users): Promise<Users> {
        dataToInsert.Password = await bcrypt.hash(dataToInsert.Password,await bcrypt.genSalt());
        return await super.Insert(dataToInsert)
    }

    async Login(dataToInsert: UserLoginDto,ipAddress:string): Promise<TokenReturnDto> {
        try
        {
            const user:Users = await this.FindByEmail(dataToInsert.Email);
            const isUserValid:boolean = await bcrypt.compare(dataToInsert.Password,user.Password);
            if(!isUserValid)
            {
                throw new BadRequestException();
            }
            if(!user.VerifyDate)
            {
                await this.SendVerification(user)
                throw new VerifyError()
            }
            const tokenData = await this.authService.SignIn(user,ipAddress)

            return new TokenReturnDto(
                tokenData.JWT,
                tokenData.TokenPayload.CreatedAt,
                tokenData.TokenPayload.ExpireDate,
                await this.mapper.mapAsync(user,Users,UserReturnDto)
            )
        }catch(err)
        {
            if(err instanceof BadRequestException || err instanceof NotFoundException)
                throw new BadRequestException("The Email or Password is Incorrect");
            throw err
        }
    }

    async SendVerification(user:Users) : Promise<void>
    {
        const token = await this.resetPassService.SendToken(user.Email,user.Id,VerificationCacheKeys.SIGNUP)
        this.notificationService.SendVerifyLink(user.Email,token)
    }

    async Verify(email:string,token:string,ipAddress:string) : Promise<TokenReturnDto>
    {
        const userId:string = await this.resetPassService.VerifyToken(email,token,VerificationCacheKeys.SIGNUP)
        const user:Users =  await this.Update(userId,{VerifyDate:new Date()})
        const tokenData = await this.authService.SignIn(user,ipAddress)

        return new TokenReturnDto(
            tokenData.JWT,
            tokenData.TokenPayload.CreatedAt,
            tokenData.TokenPayload.ExpireDate,
            await this.mapper.mapAsync(user,Users,UserReturnDto)
        )
    }

    async FindByEmail(email:string): Promise<Users> {
        return await this.FindOne({
            Email:email
        })
    }

    async UpdatePassword(userId:string,dto:UpdatePasswordDto): Promise<void> {
        const user:Users = await this.FindById(userId)
        const isUserValid:boolean = await bcrypt.compare(dto.OldPassword,user.Password);
        if(!isUserValid)
        {
            throw new BadRequestException("Password is Incorrect");
        }
        const newPassword:string =  await bcrypt.hash(dto.NewPassword,await bcrypt.genSalt());
        await this.Update(userId,{Password:newPassword});
    }

    async SendResetPassCode(email:string): Promise<void> {
        const user:Users | null = await this.FindOne({
            Email:email
        },false)

        if(user)
        {
            const code:number = await this.resetPassService.SendCode(user.Email,user.Id,VerificationCacheKeys.RESETPASS);
            this.notificationService.SendResetPass(user.Email,code)
        }else{
            await this.resetPassService.SendCode(email,null,VerificationCacheKeys.RESETPASS);
        }
    }

    async ResetPassVerifyCode(email:string,code:number): Promise<string> {
       return await this.resetPassService.VerifyCode(email,code,VerificationCacheKeys.RESETPASS);
    }

    async ResetPass(data:ResetPassTokenDto): Promise<void> {
        const userId:string = await this.resetPassService.VerifyToken(data.Email,data.Token,VerificationCacheKeys.RESETPASS);

        const newPassword:string =  await bcrypt.hash(data.NewPassword,await bcrypt.genSalt());
        await this.Update(userId,{Password:newPassword});
    }
}