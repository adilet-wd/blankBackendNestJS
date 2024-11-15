import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserService } from '../user/user.service';
import { RefreshJwtStrategy } from './strategies/refresh-jwt.strategy';
import { GroupService } from '../post/group.service';
import { SubscribeService } from '../subscribe/subscribe.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'karalovyi',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, PrismaService, LocalStrategy, JwtStrategy,
    RefreshJwtStrategy, GroupService, SubscribeService]
})
export class AuthModule {}
