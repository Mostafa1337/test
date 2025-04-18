import { GetKey } from "src/Common/GetKeyFrom";
import { Pagination } from "src/Common/Pagination/Pagination";
import { IsIn } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { SubTeams } from "../Models/SubTeams.entity";

export class SubTeamsSearchDto extends Pagination
{
    @IsIn([GetKey<SubTeams>("Name"),GetKey<SubTeams>("CreatedAt")])
    @ApiProperty({required:false,default:GetKey<SubTeams>("Name")})
    SortField: string = GetKey<SubTeams>("Name");
}