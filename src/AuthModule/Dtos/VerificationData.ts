import * as bcrypt from "bcrypt";
import { randomBytes, randomInt } from "crypto";
import { EncryptionService } from "../Services/Encryption.service";

export class VerificationData {
    private Token: string
                                                 
    UserId: string

    Retries:number = 1

    CreatedAt:Date =  new Date();

    constructor(UserId: string) {
        this.UserId = UserId
    }

    async GenerateData(encryptService:EncryptionService) : Promise<number | string>
    {
        const tokenPlain =  randomBytes(8).toString("hex");
        this.Token = encryptService.encrypt(tokenPlain)

        return tokenPlain
    }

    async IsValidate(plaindata:string,encryptService:EncryptionService) : Promise<boolean>
    {
        return this.Token ? plaindata === encryptService.decrypt(this.Token) : false;
    }

    GetToken(encryptService:EncryptionService) : string
    {
        return encryptService.decrypt(this.Token);
    }


    async AddRetries(reties:number) : Promise<void>
    {
        this.Retries = reties +1 
    }
}

export class VerificationDataWithCode extends VerificationData {
    private Code: string
    
    override async GenerateData(encryptService:EncryptionService) : Promise<number | string>
    {
        super.GenerateData(encryptService);
        const codePlain =  randomInt(1000, 9999)
        this.Code = await bcrypt.hash(codePlain.toString(), await bcrypt.genSalt())

        return codePlain
    }

    override async IsValidate(plaindata: string): Promise<boolean> {
        return this.Code ? (await bcrypt.compare(plaindata,this.Code)): false
    }
}