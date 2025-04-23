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

    @ApiProperty({description:"Is user has been accepted to the sub team"})
    @AutoMap()
    IsAccepted:boolean

    @AutoMap()
    @ApiProperty()
    LeaveDate?:Date

    @ApiProperty({description:"Is user left or kicked from the sub team"})
    @AutoMap()
    IsLeft:boolean

    @AutoMap()
    @ApiProperty()
    User:UserPreviewWithEmailDto
}