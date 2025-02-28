import { BullModule } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { EventsConfigService } from "./EventConfig/Events.config";

@Module({
    imports:[ConfigModule,
        BullModule.forRootAsync({
            imports: [ConfigModule],
            inject:[ConfigService],
            useClass:EventsConfigService
        })
    ],
    providers:[]
})
export class EventsModule{}