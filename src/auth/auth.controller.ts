import { Body, Controller, Post } from '@nestjs/common';
import { LoginPartnerDto } from './dto/login-auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  loginPartner(@Body() partnerDto: LoginPartnerDto) {
    return this.authService.validatePartner(partnerDto);
  }
}
