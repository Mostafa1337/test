import { randomBytes, randomInt } from "crypto";

export class ResetPassData {
    Token: string = randomBytes(8).toString("hex"); // TOKEN should be sent in the link is the fisrt place so it can be hashed
                                                   // TODO Encrypt instead of hash OR plain text in the db
    UserId: string

    CodeHashed: string

    Retries:number = 1

    CreatedAt:Date =  new Date();

    constructor(UserId: string,codeHashed:string) {
        this.UserId = UserId
        this.CodeHashed = codeHashed;
    }
}