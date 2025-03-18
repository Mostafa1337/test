import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './logger/logger.module';
import { DatabaseModule } from './Infrastructure/Database/Database.module';
import { UsersModule } from './Users/Users.module';
import { CacheModule } from './Infrastructure/Cache/Cache.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { NotificationModule } from './Infrastructure/Notification/NotificationModule';
import { EventsModule } from './Infrastructure/Events/Events.module';
import { FileModule } from './Common/FileUpload/File.Module';
import { CommunitiesModule } from './Communities/Communities.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    FileModule,
    LoggerModule,
    DatabaseModule,
    CacheModule,
    UsersModule,
    NotificationModule,
    EventsModule,
    CommunitiesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
