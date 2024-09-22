import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserModel } from '../user/entities/user.model';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { TokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {};

  /**
   *  Валидация партнера
   * @param userDto - данные пользователя
   * */
  async validatePartner(userDto: LoginUserDto){

    /** Поиск партнера в бд */
    const findPartner = await this.userService.getUserByUsername(userDto.username);

    /** Сравнение паролей */
    const passwordEquals = await bcrypt.compare(userDto.password, findPartner.password);
    if (findPartner && passwordEquals)  {
      const accessToken = await this.generateUserAccessToken(findPartner);
      const refreshToken = await this.generateUserRefreshToken(findPartner);
      return {
        accessToken: accessToken,
        refreshToken: refreshToken
      };
    }

  }

  /**
   * Регистрация пользователя
   * @param userDto - данные пользователя
   * */
  async registration(userDto: CreateUserDto){

    // Проверка наличия такого user в бдшке
    try {
      await this.userService.getUserByUsername(userDto.username);
    } catch (error) {}

    // Хэширование паспорта и создание пользователя
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({...userDto, password: hashPassword})
    return {
      accessToken: await this.generateUserAccessToken(user),
      refreshToken: await this.generateUserRefreshToken(user)
    }
  }

  /**
   *  Генерация токена доступа
   * @param user - данные пользователя
   * */
  private async generateUserAccessToken(user: UserModel){
    const payload = {username: user.username, role: user.role, type: "accessToken" };
    return this.jwtService.sign(payload, { expiresIn: '3m' });
  }

  /**
   *  Генерация токена обновления
   * @param user - данные пользователя
   * */
  private async generateUserRefreshToken(user: UserModel){
    // Создаем токен
    const payload = {username: user.username, role: user.role, type: "refreshToken" };
    return this.jwtService.sign(payload, { expiresIn: '7d' });
  }

  /**
   * Обновление токена доступа
   * @param refreshToken - токен обновления
   * */
  async refreshAccessToken(refreshToken: TokenPayload) {

    if (refreshToken.type !== "refreshToken") {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.userService.getUserByUsername(refreshToken.username);
    const accessToken = await this.generateUserAccessToken(user);
    return {'accessToken': accessToken};
  }


}




