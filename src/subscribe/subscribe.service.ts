import { HttpException, Injectable } from '@nestjs/common';
import { TokenPayload } from '../auth/interfaces/token-payload.interface';
import { SubscribeModel } from './entities/subscribe.model';
import { UserService } from '../user/user.service';
import { GroupService } from '../post/group.service';
import { PrismaService } from '../prisma.service';


@Injectable()
export class SubscribeService {

  constructor(private userService: UserService,
              private prismaService: PrismaService,
              private groupService: GroupService) {
  }

  /**
   * Получение всех подписчиков группы
   * @param id - айди группы
   * @returns {"user_username"}- массив пользователей
   */
  async getGroupSubscribes(id: number) {
    const post = await this.prismaService.group.findUnique({
      where: {id: Number(id) },
      include: {Subscribe: {
        select: {
          user_username: true
        }
        }}
    } );
    if (!post) throw new HttpException('User not found', 404);
    return post['Subscribe'];
  }

  /**
   * Получение всех групп на которые подписан юзер
   * @param id - айди группы
   * @returns массив групп
   */
  async getUserSubscribtions(tokenData: TokenPayload) {
    const user = await this.prismaService.user.findUnique({
      where: {username: tokenData.username },
      include: {Subscribe: {
        select: {
          group_id: true,
          group_title: true
        }
        }}
    } );
    if (!user) throw new HttpException('User not found', 404);
    return user['Subscribe'];
  }

  /**
   * Подписка в группу
   * @param groupId - айди группы
   * @param tokenData - данные токена
   * @returns {SubscribeModel} - подписка
   */
  async createSubscribe(groupId: number, tokenData: TokenPayload):Promise<SubscribeModel> {
    const user = await this.userService.getUserByUsername(tokenData.username);
    const group = await this.groupService.getGroup(groupId);
    // Check if the subscription already exists
    const existingSubscribe = await this.prismaService.subscribe.findUnique({
      where: {
        user_id_group_id: {
          user_id: user.id,
          group_id: group.id,
        },
      },
    });

    if (existingSubscribe) {
      throw new HttpException('User already subscribed', 400);
    }

    const newSubscribe = await this.prismaService.subscribe.create({
      data: {
        user_id: user.id,
        user_username: user.username,
        group_id: group.id,
        group_title: group.title
      },
    });
    return newSubscribe;
  }


  /**
   * Отписка от группы
   * @param groupId - айди группы
   * @param tokenData - данные токена
   */
  async deleteSubscribe(groupId: number, tokenData: TokenPayload) {
    const user = await this.userService.getUserByUsername(tokenData.username);
    const post = await this.groupService.getGroup(groupId);
    // Check if the subscription exists
    const existingSubscribe = await this.prismaService.subscribe.findUnique({
      where: {
        user_id_group_id: {
          user_id: user.id,
          group_id: post.id,
        },
      },
    });

    if (!existingSubscribe) {
      throw new HttpException('User did not subscribe', 400);
    }

    const deletedSubscribe = await this.prismaService.subscribe.delete({
      where: {
        id: existingSubscribe.id,
      },
    });

    return deletedSubscribe;
  }

}
