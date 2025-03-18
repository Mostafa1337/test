import { GetKey } from "src/Common/GetKeyFrom";
import { Pagination } from "src/Common/Pagination/Pagination";
import { Communities } from "../Models/Communities.entity";
import { IsIn, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CommunitySearchDto extends Pagination
{
    @IsIn([GetKey<Communities>("Name"),GetKey<Communities>("CreatedAt")])
    @ApiProperty({required:false,default:GetKey<Communities>("Name")})
    SortField: string = GetKey<Communities>("Name");

    @IsString()
    @ApiProperty({required:false,default:""})
    Name?:string = ""
}