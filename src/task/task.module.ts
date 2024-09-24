import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { GroupService } from '../post/group.service';
import { PrismaService } from '../prisma.service';
import { UserService } from '../user/user.service';

@Module({
  controllers: [TaskController],
  providers: [PrismaService, TaskService, GroupService, UserService]
})
export class TaskModule {}
