import { MailerOptions, MailerOptionsFactory, TemplateAdapter } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { join } from "path";
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Injectable()
export class NodeMoailerConfig implements MailerOptionsFactory {
    constructor(private readonly configService: ConfigService) {
    }
    createMailerOptions(): Promise<MailerOptions> | MailerOptions {
        return {
            transport: {
                host: this.configService.getOrThrow<string>("EMAILHOST"),
                port: this.configService.getOrThrow<number>("EMAILPORT"),
                secure: false,
                auth: {
                    user: this.configService.getOrThrow<string>("EMAILUSER"),
                    pass: this.configService.getOrThrow<string>("EMAILPASS"),
                },
            },
            defaults: {
                from: `${this.configService.getOrThrow<string>("EMAILUSER")}`,
            },
            template: {
                dir: join(__dirname, '..', 'Templates/Emails'), 
                adapter: new HandlebarsAdapter(),
                // options: {
                //     strict: true,
                // },
            },
        }
    }
}

