import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { UserPreviewDto } from "src/Users/Dtos/UserPreview.dto";

//TODO Talk to omar about the acceptance
export class MemberReturnDto extends UserPreviewDto
{
    @AutoMap()
    @ApiProperty()
    IsHead:boolean

    @AutoMap()
    @ApiProperty()
    JoinDate?:Date

    @AutoMap()
    @ApiProperty()
    LeaveDate?:Date
}