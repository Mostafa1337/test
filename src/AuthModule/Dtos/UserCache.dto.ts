export class UserCacheDto {
    TokenId:string
    IPAddress: string

    constructor(
        tokenId:string,
        IPAddress: string
    ) {
        this.TokenId = tokenId
        this.IPAddress = IPAddress
    }
}