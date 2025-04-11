import { BadRequestException, Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Inject, Ip, NotAcceptableException, NotFoundException, Param, Patch, Post, Put, Query, Res, StreamableFile, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConflictResponse, ApiConsumes, ApiCreatedResponse, ApiGoneResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { Users } from "../Models/Users.entity";
import { UsersService } from "../Services/Users.service";
import { ResponseType } from "src/Common/ResponseType";
import { UserLoginDto } from "../Dtos/UserLogin.dto";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { TokenReturnDto } from "src/AuthModule/Dtos/TokenReturn.dto";
import { ClassValidatorExceptionDto } from "src/Common/ClassValidatorException.dto";
import { UserCreateDto } from "../Dtos/UserCreate.dto";
import { ResetPassCodeDto, ResetPassCodeReturnDto, ResetPassDto, ResetPassTokenDto } from "../Dtos/ResetPassDtos";
import { VerifyDto } from "../Dtos/Verify.dto";

@ApiTags('Users')
@Controller("users")
export class UsersController{
    
    constructor(private readonly service:UsersService,@InjectMapper() private readonly mapper: Mapper)
    {}

    @Post("signup")
    @ApiCreatedResponse()
    @ApiConflictResponse()
    @ApiBadRequestResponse({type: [ClassValidatorExceptionDto]})
    async SignUp(@Body() dto:UserCreateDto):Promise<ResponseType<void>>{
        const newUser:Users = await this.mapper.mapAsync(dto,UserCreateDto,Users)

        const user:Users = await this.service.Insert(newUser)
        await this.service.SendVerification(user)

        return new ResponseType<void>(HttpStatus.CREATED,"A verifiation email was sent to your email")
    }

    @Post("login")
    @ApiOkResponse({ type:TokenReturnDto })
    @ApiBadRequestResponse({type: [ClassValidatorExceptionDto]})
    @ApiNotFoundResponse()
    async Login(
        @Body() dto:UserLoginDto,
        @Ip() ipAddress:string,
    ):Promise<ResponseType<TokenReturnDto>>{
        const data:TokenReturnDto = await this.service.Login(dto,ipAddress);
        return new ResponseType<TokenReturnDto>(HttpStatus.OK,"logged in successfully",data)
    }

    @Post("verify")
    @ApiOkResponse({ type:TokenReturnDto })
    @ApiBadRequestResponse({type: [ClassValidatorExceptionDto]})
    @ApiNotFoundResponse()
    @ApiUnauthorizedResponse()
    @ApiConflictResponse()
    @ApiGoneResponse()
    async Verify(
        @Body() dto:VerifyDto,
        @Ip() ipAddress:string,
    ):Promise<ResponseType<TokenReturnDto>>{
        const data:TokenReturnDto = await this.service.Verify(dto.Email,dto.Token,ipAddress);
        return new ResponseType<TokenReturnDto>(HttpStatus.OK,"logged in successfully",data)
    }

    @Post("resetpass/sendcode")
    @ApiBody({ type:ResetPassDto })
    @ApiOkResponse()
    @ApiNotFoundResponse()
    @ApiConflictResponse()
    @ApiBadRequestResponse({type: [ClassValidatorExceptionDto]})
    async ForgetPasswordSendEmail(
        @Body() dto:ResetPassDto,
    ):Promise<ResponseType<void>>{
        await this.service.SendResetPassCode(dto.Email);

        return new ResponseType<void>(HttpStatus.OK,"A verify code was sent to your email") 
    }

    @Post("resetpass/verifycode")
    @ApiBody({ type:ResetPassCodeDto })
    @ApiOkResponse({ type:ResetPassCodeReturnDto })
    @ApiGoneResponse()
    @ApiUnauthorizedResponse()
    @ApiBadRequestResponse({type: [ClassValidatorExceptionDto]})
    async ForgetPasswordVerifyCode(
        @Body() dto:ResetPassCodeDto,
    ):Promise<ResponseType<ResetPassCodeReturnDto>>{
        const token:string = await this.service.ResetPassVerifyCode(dto.Email,dto.Code);

        return new ResponseType<ResetPassCodeReturnDto>(HttpStatus.OK,"Code Is Valid",{
            Token:token
        }) 
    }

    @Post("resetpass")
    @ApiBody({ type:ResetPassTokenDto })
    @ApiOkResponse()
    @ApiUnauthorizedResponse()
    @ApiGoneResponse()
    @ApiBadRequestResponse({type: [ClassValidatorExceptionDto]})
    async ForgetPassword(
        @Body() dto:ResetPassTokenDto,
    ):Promise<ResponseType<void>>{
        await this.service.ResetPass(dto);

        return new ResponseType<void>(HttpStatus.OK,"Password changed successfully") 
    }
}
