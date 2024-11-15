import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor (private authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password'
    });
  };

  async validate(username: string, password: string) {
    const accessToken = await this.authService.validatePartner({username, password});
    if(!accessToken) throw new UnauthorizedException();
    return accessToken;
  }


}