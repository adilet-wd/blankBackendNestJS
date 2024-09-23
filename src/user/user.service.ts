import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { TokenPayload } from '../auth/interfaces/token-payload.interface';

@Injectable()
export class UserService {
  constructor( private prismaService:  PrismaService) {}

  /**
   * Получение всех пользователей
   * @returns - массив пользователей
   */
  async getAllUsers(){
    return this.prismaService.user.findMany({
      select: {
        id: false,
        username: true,
        email: true,
        password: false,
        surname: true,
        name: true,
        role: true,
      }
    });
  }

  /**
   * Получение пользователя по username
   * @param username - имя пользователя
   * @returns {UserModel}- Пользователь
  */
  async getUserByUsername(username: string){
    const user = await this.prismaService.user.findUnique({where: {username: username}});
    if (!user) throw new HttpException('User not found', 404);
    return user;
  }

  /**
   * Получение пользователя по токену доступа
   * @param payload - Токен доступа
   * @returns {UserModel}- Пользователь
  */
  async getUserByToken(payload: TokenPayload){
    const user = await this.getUserByUsername(payload.username);
    return user;
  }

  /**
   * Создание пользователя
   * @param data - данные пользователя
   * @returns {UserModel}- Пользователь
  */
  async createUser(data: CreateUserDto){
    const findUserByName = await this.prismaService.user.findUnique({where: {username: data.username}});
    const findUserByEmail = await this.prismaService.user.findUnique({where: {email: data.email}});
    if (findUserByName) throw new HttpException('Пользователь с таким именем уже существует', 404);
    if (findUserByEmail) throw new HttpException('Пользователь с такой почтой уже существует', 404);

    return this.prismaService.user.create({data});
  }

  /**
   * Проверка наличия пользователя с такой почтой
   * @param email - почта пользователя
   * @returns {boolean}- true если пользователь с такой почтой существует, иначе false
   */
  async userWithEmailExists (email: string){
    const user = await this.prismaService.user.findUnique({where: {email: email}});
    if (user) return true
    return false;

  }

  /**
   * Проверка наличия пользователя с таким именем
   * @param username - имя пользователя
   * @returns {boolean}- true если пользователь с таким именем существует, иначе false
   */
  async userWithUsernameExists (username: string) {
    const user = await this.prismaService.user.findUnique({ where: { username: username } });
    if (user) return true
    return false;
  }
}
