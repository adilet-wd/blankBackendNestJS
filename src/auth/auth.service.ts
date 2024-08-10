import { Injectable } from '@nestjs/common';
import { LoginPartnerDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  validatePartner(partnerDto: LoginPartnerDto){
    console.log(partnerDto);
  }
}




