import { BullRootModuleOptions, SharedBullConfigurationFactory } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class EventsConfigService implements SharedBullConfigurationFactory {
    constructor(private readonly configService:ConfigService){}
  createSharedConfiguration(): BullRootModuleOptions {
    return {
      connection: {
        url:this.configService.getOrThrow<string>("REDISURL"),
      },
    };
  }
}