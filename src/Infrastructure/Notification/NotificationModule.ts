import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { NodeMoailerConfig } from "./Configs/NodeMailer.config";
import { NotificationServiceProvider } from "./Services/Notification.service";
import { EmailService } from "./Services/Email.service";

@Module({
    imports: [
        ConfigModule,
        MailerModule.forRootAsync({
            inject:[ConfigService],
            useClass: NodeMoailerConfig,
            imports:[ConfigModule]
        }),
    ],
    providers:[NodeMoailerConfig,EmailService,NotificationServiceProvider],
    exports:[NotificationServiceProvider]
})
export class NotificationModule { }