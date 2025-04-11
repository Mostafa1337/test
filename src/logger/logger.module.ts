import { Module } from '@nestjs/common';
import { WinstonModule, } from 'nest-winston';
import winston, { createLogger, format, transports } from "winston";
import { LoggerMainService } from './Logger.service';

@Module({
    imports: [
        WinstonModule.forRoot({
            transports: [
                new transports.File({
                    filename: 'application.log',
                    level: 'info',
                    format:  format.combine(
                        format.timestamp(),
                        format.colorize(),
                        format.printf(
                            ({ timestamp, level, message,info, }) =>
                                `[${timestamp}] ${level}: ${message}`
                        )
                    ),
                }),
            ],
        }),
    ],
    providers:[LoggerMainService],
    exports: [LoggerMainService],
})
export class LoggerModule {}
