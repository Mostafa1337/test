import { GetKey } from "src/Common/GetKeyFrom";
import { Pagination } from "src/Common/Pagination/Pagination";
import { IsIn } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Teams } from "../Models/Teams.entity";

export class TeamsSearchDto extends Pagination
{
    @IsIn([GetKey<Teams>("Name"),GetKey<Teams>("CreatedAt")])
    @ApiProperty({required:false,default:GetKey<Teams>("Name")})
    SortField: string = GetKey<Teams>("Name");
}