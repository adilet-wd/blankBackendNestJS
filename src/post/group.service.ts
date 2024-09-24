import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { TokenPayload } from '../auth/interfaces/token-payload.interface';
import { UserService } from '../user/user.service';
import { GroupModel } from './entities/group.model';

@Injectable()
export class GroupService {
  constructor( private prismaService:  PrismaService,
               private userService: UserService) {}

  /**
   * Получение всех групп
   * @returns - массив групп
   */
  async getAllGroups(){
    const groups = this.prismaService.group.findMany({
      select: {
        id: true,
        title: true,
        author: true,
        description: true
      }
    });
    return groups;
  }

  /**
   * Получение группы по id
   * @param id - id группы
   * @returns {GroupModel} - пост
   * */
  async getGroup(id: number){
    const group = await this.prismaService.group.findUnique({where: {id: Number(id)},include: {Subscribe:  true, task: true}});
    if (!group) {
      throw new HttpException('Group not found', 404);
    }
    return group;
  }

  /**
   * Создание группы
   * @param data - данные группы
   * @param tokenData - данные токена
   * @returns {GroupModel}- Группа
   */
  async createGroup(data: CreateGroupDto, tokenData: TokenPayload):Promise<GroupModel> {
    const user = await this.userService.getUserByUsername(tokenData.username);
    const newGroup = await this.prismaService.group.create({
      data: {
        title: data.title,
        author: tokenData.username,
        description: data.description,
        owner_id: user.id,
      },
    });
    return newGroup;
  }

}
