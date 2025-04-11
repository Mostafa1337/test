import { randomBytes } from "crypto";

export class TokenPayLoad{
    readonly TokendId:string = randomBytes(5).toString("hex")

    readonly CreatedAt:Date = new Date()

    // readonly FirstName: string

    readonly Email: string

    readonly UserId:string

    readonly IsSuperAdmin:boolean = false

    readonly ExpireDate:Date

    constructor(userId:string,firstName:string,email:string,IsSuperAdmin:boolean,time:number,durationType:string){
        // this.FirstName = firstName
        this.Email = email
        this.IsSuperAdmin = IsSuperAdmin
        
        switch(durationType)
        {
            case "s" : 
                this.ExpireDate = new Date(this.CreatedAt.getTime() +  time * 1000);
                break;
            case "h" : 
            default:
                this.ExpireDate = new Date(this.CreatedAt.getTime() + 60 * 60 * time * 1000);
                break;
        }
        
        this.UserId = userId;
    }
}