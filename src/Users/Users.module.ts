import { Module,} from '@nestjs/common';
import { DatabaseModule } from 'src/Infrastructure/Database/Database.module';
import { UsersController } from './Controllers/Users.controller';
import { UsersService } from './Services/Users.service';
import { Users } from './Models/Users.entity';
import { UsersProfile } from './Controllers/Users.profile';
import { AuthModule } from 'src/AuthModule/Auth.module';
import { NotificationModule } from 'src/Infrastructure/Notification/NotificationModule';

@Module({
  imports: [
    DatabaseModule.forFeature([Users]),AuthModule,NotificationModule
  ],
  controllers: [UsersController],
  providers: [UsersService,UsersProfile,NotificationModule],
})
export class UsersModule{}
