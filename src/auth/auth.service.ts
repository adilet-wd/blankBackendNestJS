import { HttpException, Injectable } from '@nestjs/common';
import { LoginPartnerDto } from './dto/login-auth.dto';
import { PartnerService } from '../partner/partner.service';
import { JwtService } from '@nestjs/jwt';
import { PartnerModel } from '../partner/entities/partner.model';

@Injectable()
export class AuthService {
  constructor(private partnerService: PartnerService, private jwtService: JwtService) {};

  async validatePartner(partnerDto: LoginPartnerDto){
    // Проверяем совпадает ли пароль и почта в бд
    const findPartner = await this.partnerService.getPartnerByBrandName(partnerDto);
    if(!findPartner) throw new HttpException('Партнер не найден', 404);

    if (findPartner.password === partnerDto.password) {
      const accessToken = await this.generatePartnerAccessToken(findPartner);
      const refreshToken = await this.generatePartnerRefreshToken(findPartner);
      return {
        accessToken: accessToken,
        refreshToken: refreshToken
      };
    }
  }


  private async generatePartnerAccessToken(partner: PartnerModel){
    // Создаем токен
    const payload = {brand_name: partner.brand_name, role: partner.role, type: "accessToken" };
    return this.jwtService.sign(payload, { expiresIn: '1h' });
  }

  private async generatePartnerRefreshToken(partner: PartnerModel){
    // Создаем токен
    const payload = {brand_name: partner.brand_name, role: partner.role, type: "refreshToken" };
    return this.jwtService.sign(payload, { expiresIn: '7d' });
  }
}




