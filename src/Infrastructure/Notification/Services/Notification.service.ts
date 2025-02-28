import { Injectable, Provider, Scope } from "@nestjs/common";
import { INotification } from "src/Common/Generic/Contracts/INotificationService";
import { EmailService } from "./Email.service";
import { IEmailDto } from "../Dtos/IEmail.dto";

@Injectable({scope:Scope.REQUEST})
export class NotificationService implements INotification
{
    constructor(private readonly emailService:EmailService)
    {}

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
    
}

export const NotificationServiceProvider:Provider = {
    provide:INotification,
    useClass:NotificationService
} 