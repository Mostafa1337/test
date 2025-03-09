import { Injectable, Provider, Scope } from "@nestjs/common";
import { INotification } from "src/Common/Generic/Contracts/INotificationService";
import { EmailService } from "./Email.service";
import { IEmailDto } from "../Dtos/IEmail.dto";
import { ConfigService } from "@nestjs/config";

@Injectable({scope:Scope.REQUEST})
export class NotificationService implements INotification
{
    constructor(private readonly emailService:EmailService,private readonly configService:ConfigService)
    {}

    async SendVerifyLink(toEmail: string, token: string): Promise<void> {
        
        await this.emailService.SendEmail({
            Subject:"Verification",
            HtmlTemplateFilePath:"verification",
            To:toEmail,
            Message:"Verify your identity",
            Context:{
                Link:`${this.GetFrontendLink()}/users/verify?Email=${toEmail}&Token=${token}`
            }
        });
    }

    async SendResetPass(toEmail:string,code:number): Promise<void> {

        await this.emailService.SendEmail({
            Subject:"Reset Password",
            HtmlTemplateFilePath:"forgetpass",
            To:toEmail,
            Message:"Reset password verification code",
            Context:{
                Code: code
            }
        });
        
    }
    
    SentNotification() {
        throw new Error("Method not implemented.");
    }
    SendEmailAndNotification() {
        throw new Error("Method not implemented.");
    }
    
    private GetFrontendLink():string
    {
        return `${this.configService.getOrThrow<string>("FRONTEND_PROTOCOL")}://`+
                `${this.configService.getOrThrow<string>("FRONTEND_DOMAIN")}:` +
                `${this.configService.getOrThrow<string>("FRONTEND_PORT")}`
    }
}

export const NotificationServiceProvider:Provider = {
    provide:INotification,
    useClass:NotificationService
} 