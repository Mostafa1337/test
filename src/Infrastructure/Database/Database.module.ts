import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from "src/logger/logger.module";
import {DatabaseProvider} from './Database.provider';
import { EntityBase } from '../../Common/EntityBase';
import { GenericRepo } from './Repos/GenericRepo';
import { LoggerMainService } from 'src/logger/Logger.service';

@Module({
  imports: [
    LoggerModule,
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      useClass:DatabaseProvider,
      inject:[ConfigService],
    }),
  ],
  providers: [],
})

export class DatabaseModule {
  static forFeature<T extends EntityBase>(entity: any[]): DynamicModule {
    const providers: Provider[] = entity.map(x=>{
      const repositoryToken = getRepositoryToken(x);
      const contractToken = `REPO_${x.name.toUpperCase()}`;

      const contractProvider: Provider = {
        provide: contractToken,
        useFactory: (repository,loggerServie:LoggerMainService) => new GenericRepo<T>(repository,loggerServie),
        inject: [repositoryToken,LoggerMainService],  
      };

      return contractProvider;
    })



    return {
      module: DatabaseModule,
      imports:[TypeOrmModule.forFeature(entity)],
      providers: [...providers],
      exports: [...providers],
    };
  }
}