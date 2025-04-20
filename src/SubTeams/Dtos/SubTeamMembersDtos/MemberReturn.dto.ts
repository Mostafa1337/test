import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { UserPreviewDto, UserPreviewWithEmailDto } from "src/Users/Dtos/UserPreview.dto";

//TODO Talk to omar about the acceptance
export class MemberReturnDto
{
    @AutoMap()
    @ApiProperty()
    Id:string
    
    @AutoMap()
    @ApiProperty()
    IsHead:boolean

    @AutoMap()
    @ApiProperty()
    JoinDate?:Date

    @AutoMap()
    @ApiProperty()
    LeaveDate?:Date

    @AutoMap()
    @ApiProperty()
    User:UserPreviewWithEmailDto
}