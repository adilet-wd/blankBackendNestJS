import { Module } from '@nestjs/common'
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [UserModule, AuthModule, PostModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
