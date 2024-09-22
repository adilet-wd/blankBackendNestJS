import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';


@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "karalovyi",
    });
  }

  validate(payload) {
    // Проверка на наличие роли в токене и является ли токен accessToken
    if (payload.type != "refreshToken" || !payload.role) {
      throw new UnauthorizedException('Invalid refreshToken');
    }

    return payload
  }

}