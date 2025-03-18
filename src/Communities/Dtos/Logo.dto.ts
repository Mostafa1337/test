import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class LogoDto
{
    @AutoMap()
    @ApiProperty()
    Name:string

    @AutoMap()
    @ApiProperty()
    File:string = "/communities/images/default"

    constructor()
    {
        this.Name = `${this.Name} Logo`
    }
}