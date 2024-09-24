import { HttpException, Injectable } from '@nestjs/common';
import { TokenPayload } from '../auth/interfaces/token-payload.interface';
import { SubscribeModel } from './entities/subscribe.model';
import { UserService } from '../user/user.service';
import { PostService } from '../post/post.service';
import { PrismaService } from '../prisma.service';


@Injectable()
export class SubscribeService {

  constructor(private userService: UserService,
              private prismaService: PrismaService,
              private postService: PostService) {
  }

  /**
   * Получение всех подписчиков поста
   * @param id - айди поста
   * @returns {"user_username"}- массив пользователей
   */
  async getPostSubscribes(id: number) {
    const post = await this.prismaService.post.findUnique({
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
   * Получение всех постов на которые подписан юзер
   * @param id - айди поста
   * @returns массив посотв
   */
  async getUserSubscribtions(tokenData: TokenPayload) {
    const user = await this.prismaService.user.findUnique({
      where: {username: tokenData.username },
      include: {Subscribe: {
        select: {
          post_id: true,
          post_title: true
        }
        }}
    } );
    if (!user) throw new HttpException('User not found', 404);
    return user['Subscribe'];
  }

  /**
   * Подписка на пост
   * @param postId - айди поста
   * @param tokenData - данные токена
   * @returns {SubscribeModel} - подписка
   */
  async createSubscribe(postId: number, tokenData: TokenPayload):Promise<SubscribeModel> {
    const user = await this.userService.getUserByUsername(tokenData.username);
    const post = await this.postService.getPost(postId);
    // Check if the subscription already exists
    const existingSubscribe = await this.prismaService.subscribe.findUnique({
      where: {
        user_id_post_id: {
          user_id: user.id,
          post_id: post.id,
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
        post_id: post.id,
        post_title: post.title
      },
    });
    return newSubscribe;
  }


  /**
   * Отписка от поста на пост
   * @param postId - айди поста
   * @param tokenData - данные токена
   */
  async deleteSubscribe(postId: number, tokenData: TokenPayload) {
    const user = await this.userService.getUserByUsername(tokenData.username);
    const post = await this.postService.getPost(postId);
    // Check if the subscription exists
    const existingSubscribe = await this.prismaService.subscribe.findUnique({
      where: {
        user_id_post_id: {
          user_id: user.id,
          post_id: post.id,
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
