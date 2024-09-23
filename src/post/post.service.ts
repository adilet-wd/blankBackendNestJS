import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { TokenPayload } from '../auth/interfaces/token-payload.interface';
import { UserService } from '../user/user.service';
import { PostModel } from './entities/post.model';

@Injectable()
export class PostService {
  constructor( private prismaService:  PrismaService,
               private userService: UserService) {}

  /**
   * Получение всех постов
   * @returns - массив постов
   */
  async getAllPosts(){
    const posts = this.prismaService.post.findMany({
      select: {
        id: true,
        title: true,
        author: true,
        description: true
      }
    });
    return posts;
  }

  /**
   * Получение поста по id
   * @param id - id поста
   * @returns {PostModel} - пост
   * */
  async getPost(id: number){
    const post = await this.prismaService.post.findUnique({where: {id: Number(id)}});
    if (!post) {
      throw new HttpException('Post not found', 404);
    }
    return post;
  }

  /**
   * Создание поста
   * @param data - данные поста
   * @param tokenData - данные токена
   * @returns {PostModel}- Пост
   */
  async createPost(data: CreatePostDto, tokenData: TokenPayload):Promise<PostModel> {
    const user = await this.userService.getUserByUsername(tokenData.username);
    const newPost = await this.prismaService.post.create({
      data: {
        title: data.title,
        author: tokenData.username,
        description: data.description,
        owner_id: user.id,
      },
    });
    return newPost;
  }

}
