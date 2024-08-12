import { Body, Controller, HttpException, Post, UseGuards } from '@nestjs/common';
import { LoginPartnerDto } from './dto/login-auth.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  async loginPartner(@Body() partnerDto: LoginPartnerDto) {

    const partner = await this.authService.validatePartner(partnerDto);
    if (!partner) throw new HttpException('Пользователь не найден', 401);

    return partner;
  }
}
