import { ApiProperty } from "@nestjs/swagger"

export class AddMemberDto
{
    @ApiProperty()
    public UserId:string

    @ApiProperty()
    public IsHead:boolean

    @ApiProperty()
    public JoiDate:Date
}