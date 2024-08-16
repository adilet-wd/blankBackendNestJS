import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "city312adilet",
    });
  }

  validate(payload) {
    // Проверка на наличие роли в токене и является ли токен accessToken
    if (payload.type != "accessToken" || !payload.role) {

      throw new UnauthorizedException('Invalid accessToken payload');
    }
    return payload
  }

}