import { ApiProperty } from "@nestjs/swagger";

export class JoinLinkDto {
    @ApiProperty()
    JoinLink: string

    constructor(JoinLink: string) {
        this.JoinLink = JoinLink
    }
}