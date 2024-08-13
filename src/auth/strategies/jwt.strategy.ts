import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "city312adilet",
    });
  }

  validate(payload: any) {
    // const {brand_name, id} = payload;
    // console.log(`brand_name: ${brand_name}, id: ${id}`);
    return payload;
  }

}