import { Module } from '@nestjs/common';
import { SubscribeController } from './subscribe.controller';
import { SubscribeService } from './subscribe.service';
import { PrismaService } from '../prisma.service';
import { GroupService } from '../post/group.service';
import { UserService } from '../user/user.service';

@Module({
  controllers: [SubscribeController],
  providers: [SubscribeService, PrismaService, GroupService, UserService]
})
export class SubscribeModule {}
