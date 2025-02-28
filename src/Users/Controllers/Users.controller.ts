import { Body, Controller, Get, HttpCode, HttpStatus, Ip, Patch, Post, Put, Res, UseGuards } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiGoneResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { Users } from "../Models/Users.entity";
import { UsersService } from "../Services/Users.service";
import { ResponseType } from "src/Common/ResponseType";
import { UserLoginDto } from "../Dtos/UserLogin.dto";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { TokenReturnDto } from "src/AuthModule/Dtos/TokenReturn.dto";
import { UserReturnDto } from "../Dtos/UserReturn.dto";
import { CurrentUserDecorator } from "src/AuthModule/CurrentUser.decorator";
import { TokenPayLoad } from "src/AuthModule/Dtos/TokenPayload";
import { JWTGaurd } from "src/AuthModule/Gaurds/JWT.gaurd";
import { response, Response } from "express";
import { ClassValidatorExceptionDto } from "src/Common/ClassValidatorException.dto";
import { MapEnumHelper } from "src/Common/MapEnum.helper";
import { UserCreateDto } from "../Dtos/UserCreate.dto";
import { UserUpdateDto } from "../Dtos/UserUpdate.dto";
import { UpdatePasswordDto } from "../Dtos/UpdatePassword.dto";
import { ResetPassCodeDto, ResetPassCodeReturnDto, ResetPassDto, ResetPassTokenDto } from "../Dtos/ResetPassDtos";

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

        await this.service.Insert(newUser)


        return new ResponseType<void>(HttpStatus.CREATED,"Signed up successfully")
    }

    @Post("login")
    @ApiOkResponse({ type:TokenReturnDto })
    @ApiBadRequestResponse({type: [ClassValidatorExceptionDto]})
    @ApiNotFoundResponse()
    async Login(
        @Body() dto:UserLoginDto,
        @Ip() ipAddress:string,
    ):Promise<ResponseType<TokenReturnDto>>{
        const data:TokenReturnDto = await this.service.Verify(dto,ipAddress);
        return new ResponseType<TokenReturnDto>(HttpStatus.OK,"logged in successfully",data)
    }

    @Get("profile")
    @ApiBearerAuth()
    @ApiOkResponse({ type:UserReturnDto })
    @ApiNotFoundResponse()
    @UseGuards(JWTGaurd)
    async GetMyProfile(
        @CurrentUserDecorator() tokenPayLoad:TokenPayLoad
    ):Promise<ResponseType<UserReturnDto>>{
        const user:Users = await this.service.FindById(tokenPayLoad.UserId,true);
        const userReturn:UserReturnDto = await this.mapper.mapAsync(user,Users,UserReturnDto);

        return new ResponseType<UserReturnDto>(HttpStatus.OK,"logged in successfully",userReturn) 
    }

    @Patch("profile")
    @ApiBearerAuth()
    @ApiBody({ type:UserUpdateDto })
    @ApiOkResponse({ type:UserReturnDto })
    @ApiNotFoundResponse()
    @ApiConflictResponse()
    @ApiBadRequestResponse({type: [ClassValidatorExceptionDto]})
    @UseGuards(JWTGaurd)
    async UpdateMyProfile(
        @Body() dto:UserUpdateDto,
        @CurrentUserDecorator() tokenPayLoad:TokenPayLoad
    ):Promise<ResponseType<UserReturnDto>>{
        const userUpdate:Users = await this.mapper.mapAsync(dto,UserUpdateDto,Users);

        const user:Users = await this.service.Update(tokenPayLoad.UserId,userUpdate);
        const userReturn:UserReturnDto = await this.mapper.mapAsync(user,Users,UserReturnDto);

        return new ResponseType<UserReturnDto>(HttpStatus.OK,"Updated successfully",userReturn) 
    }

    @Patch("profile/password")
    @ApiBearerAuth()
    @ApiBody({ type:UpdatePasswordDto })
    @ApiOkResponse()
    @ApiNotFoundResponse()
    @ApiBadRequestResponse({type: [ClassValidatorExceptionDto]})
    @UseGuards(JWTGaurd)
    async UpdateMyProfilePassword(
        @Body() dto:UpdatePasswordDto,
        @CurrentUserDecorator() tokenPayLoad:TokenPayLoad
    ):Promise<ResponseType<void>>{
        await this.service.UpdatePassword(tokenPayLoad.UserId,dto);

        return new ResponseType<void>(HttpStatus.OK,"Password changed successfully") 
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
