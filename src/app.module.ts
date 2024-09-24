import { Module } from '@nestjs/common'
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { GroupModule } from './post/group.module';
import { SubscribeModule } from './subscribe/subscribe.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [UserModule, AuthModule, GroupModule, SubscribeModule, TaskModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
