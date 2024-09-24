import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CreateGroupDto } from '../post/dto/create-group.dto';
import { TokenPayload } from '../auth/interfaces/token-payload.interface';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-Task.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { Request } from 'express';

@ApiTags('Task')
@Controller('/api/task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @ApiOperation({summary: "Get group by tasks"})
  @Get('/:id')
  async getTask(@Param('id') id: number) {
    return this.taskService.getTask(id);
  }

  @ApiOperation({summary: "Get all tasks"})
  @Get('/')
  async getTasks() {
    return this.taskService.getAllTasks();
  }

  @ApiOperation({summary: "Get group tasks"})
  @Get('/group/:id')
  async getGroupTasks(@Param('id') id: number) {
    return this.taskService.getGroupTasks(id);
  }

  @ApiOperation({summary: "Create task"})
  @Post('/create')
  async createTask(@Body() taskDto: CreateTaskDto) {
    return this.taskService.createTask(taskDto);
  }

  @ApiOperation({summary: "Subscribe to task"})
  @Post('/:id')
  @UseGuards(JwtGuard)
  async singUpToTask(@Param('id') id: number, @Req() req: Request) {
    const payload = req.user as TokenPayload;
    return this.taskService.signUpTask(id, payload);
  }

  @ApiOperation({summary: "Complete task"})
  @Post('/complete/:id')
  @UseGuards(JwtGuard)
  async completeTask(@Param('id') id: number, @Req() req: Request) {
    const payload = req.user as TokenPayload;
    return this.taskService.completeTask(id, payload);
  }


}
