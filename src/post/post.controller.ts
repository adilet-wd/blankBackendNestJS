import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { Request } from 'express';
import { TokenPayload } from '../auth/interfaces/token-payload.interface';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';

@ApiTags('Posts')
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @ApiOperation({summary: "Get post by id"})
  @Get('/:id')
  async getPost(@Param('id') id: number) {
    return this.postService.getPost(id);
  }

  @ApiOperation({summary: "Get all posts"})
  @Get('/')
  async getAllPosts() {
    return this.postService.getAllPosts();
  }

  @ApiOperation({summary: "Create post"})
  @Post('/create')
  @UseGuards(JwtGuard)
  async createPost(@Body() postDto: CreatePostDto, @Req() req: Request) {
    const payload = req.user as TokenPayload;
    return this.postService.createPost(postDto, payload);
  }

}
