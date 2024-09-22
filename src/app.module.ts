import { Module } from '@nestjs/common'
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
