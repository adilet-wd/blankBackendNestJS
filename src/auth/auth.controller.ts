import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { JwtGuard } from './guards/jwt.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Авторизация")
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({summary: "Вход в аккаунт и получение JWT токена"})
  @Post('login')
  @UseGuards(LocalGuard)
  async loginPartner(@Req() req: Request) {
    return req.user;
  }

  @ApiOperation({summary: "Получение информации о токене"})
  @Get('status')
  @UseGuards(JwtGuard)
  async status(@Req() req: Request) {
    // console.log(req.user);
    return req.user;
  }

}
