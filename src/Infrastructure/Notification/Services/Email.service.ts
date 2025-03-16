import { MailerService } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";
import { IEmailDto } from "../Dtos/IEmail.dto";
import { Injectable, Scope } from "@nestjs/common";

@Injectable({scope:Scope.REQUEST})
export class EmailService
{
    constructor(
        private readonly mailService: MailerService,
        private readonly configService:ConfigService
    ) {}

    async SendEmail<T>(dto:IEmailDto<T>)
    {
        try
        {
            await this.mailService.sendMail({
                to: dto.To,
                subject: dto.Subject,
                text: dto.Message,
                template: dto.HtmlTemplateFilePath,
                context: dto.Context
            });
        }catch(err)
        {
            console.log(err)
        }
    }
}