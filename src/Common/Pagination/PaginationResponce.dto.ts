import { ApiProperty } from "@nestjs/swagger"

export class PaginationResponce<T> {
    @ApiProperty()
    Data: T[] = []

    @ApiProperty()
    Count: number = 0

    constructor(Data: T[], Count: number) {
        this.Data = Data
        this.Count = Count
    }
}