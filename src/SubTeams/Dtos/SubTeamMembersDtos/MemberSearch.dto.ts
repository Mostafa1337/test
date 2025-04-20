import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsIn, IsOptional, IsString } from "class-validator";
import { GetKey } from "src/Common/GetKeyFrom";
import { Pagination } from "src/Common/Pagination/Pagination";
import { SubTeamMembers } from "src/SubTeams/Models/SubTeamMembers.entity";

export class MemberSearchDto extends Pagination
{
    @IsIn([GetKey<SubTeamMembers>("JoinDate"),"Name"])
    @IsOptional()
    @ApiProperty({required:false,default:GetKey<SubTeamMembers>("JoinDate"),description:"Sort by user Name or JoinDate"})
    SortField: string = GetKey<SubTeamMembers>("JoinDate");

    @IsString()
    @ApiProperty({required:false})
    @IsOptional()
    UserName?:string = null

    @IsString()
    @ApiProperty({required:false})
    @IsOptional()
    UserEmail?:string = null

    @IsIn([true,false])
    @ApiProperty({required:false})
    @IsOptional()
    @Transform(({value})=> value === "true" ? true : false)
    IsAccepted?:boolean  = null

    @IsIn([true,false])
    @ApiProperty({required:false})
    @IsOptional()
    @Transform(({value})=> value === "true" ? true : false)
    IsLeft?:boolean  = false

    @IsIn([true,false])
    @ApiProperty({required:false})
    @IsOptional()
    @Transform(({value})=> value === "true" ? true : false)
    IsHead?:boolean = null
}