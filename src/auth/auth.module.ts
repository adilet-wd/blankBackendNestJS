import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PartnerService } from '../partner/partner.service';
import { PrismaService } from '../prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'city312adilet',
      signOptions: { expiresIn: '5m' }
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PartnerService, PrismaService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
