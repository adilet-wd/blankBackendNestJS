import { Module } from '@nestjs/common';
import { SubscribeController } from './subscribe.controller';
import { SubscribeService } from './subscribe.service';
import { PrismaService } from '../prisma.service';
import { PostService } from '../post/post.service';
import { UserService } from '../user/user.service';

@Module({
  controllers: [SubscribeController],
  providers: [SubscribeService, PrismaService, PostService, UserService]
})
export class SubscribeModule {}
