import { HttpException, Injectable } from '@nestjs/common';
import { LoginPartnerDto } from './dto/login-auth.dto';
import { PartnerService } from '../partner/partner.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private partnerService: PartnerService, private jwtService: JwtService) {};

  async validatePartner(partnerDto: LoginPartnerDto){
    try {
      const findPartner = await this.partnerService.getPartnerByBrandName(partnerDto);
      if(!findPartner) return null;

      if (findPartner.password === partnerDto.password) {
        const payload = {brand_name: findPartner.brand_name, id: findPartner.id};
        const accessToken = this.jwtService.sign(payload);
        return {accessToken: accessToken};
      }

    } catch (e) {
      throw new HttpException('Ошибка', 400);
    }
  }
}




