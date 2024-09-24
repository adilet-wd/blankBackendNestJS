import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { GroupService } from '../post/group.service';
import { CreateTaskDto } from './dto/create-Task.dto';
import { UserService } from '../user/user.service';
import { TokenPayload } from '../auth/interfaces/token-payload.interface';

@Injectable()
export class TaskService {
  constructor( private prismaService:  PrismaService,
               private groupService: GroupService,
               private userService: UserService) {}

  /**
   * Получение всех заданий
   * @returns - массив заданий
   */
  async getAllTasks() {
    const tasks = await this.prismaService.task.findMany({});
    return tasks;
  }

  /**
   * Получение задания по id
   * @param id - id задания
   * @returns {TaskModel} - пост
   * */
  async getTask(id: number){
    const task = await this.prismaService.task.findUnique(
      {where: {id: Number(id) }, include: {users: true}
    });
    if (!task) {
      throw new HttpException('Task not found', 404);
    }
    return task;
  }

  /**
   * Получение заданий группы по id
   * @param id - id группы
   * @returns - массив заданий
   * */
  async getGroupTasks(id: number){
    const group = await this.prismaService.group.findUnique({where: {id: Number(id)},include: {Subscribe:  true, task: true}});
    if (!group) {
      throw new HttpException('Group not found', 404);
    }
    return group["task"];
  }

  /**
   * Создание задания
   * @param data - данные группы
   * @returns {TaskModel}- Группа
   */
  async createTask(data: CreateTaskDto){
    const group = await this.groupService.getGroup(data.group_id);
    const newTask = await this.prismaService.task.create({
      data: {
        title: data.title,
        description: data.description,
        group_id: group.id,
        group_title: group.title,
      },
    });
    return newTask;
  }

  /**
   * Взять задание
   * @param taskId - айди задания
   * @param tokenData - данные токена
   * @returns {TaskModel}- Задание
   */
  async signUpTask(taskId: number, tokenData: TokenPayload){
    const task = await this.getTask(taskId);
    if (task.completed) {
      throw new HttpException('Task is already completed', 400);
    }
    const user = await this.userService.getUserByUsername(tokenData.username);

    const updatedTask = await this.prismaService.task.update({
      where: {id: Number(taskId)},
      include: {users: true},
      data: {
        users: {
          connect: {id: user.id},
        },
      },
    });
    return updatedTask;
  }

  /**
   * Завершить задание
   * @param taskId - айди задания
   * @param tokenData - данные токена
   * @returns {TaskModel}- Задание
   */
  async completeTask(taskId: number, tokenData: TokenPayload){
    const task = await this.getTask(taskId);
    if (task.completed) {
      throw new HttpException('Task is already completed', 400);
    }
    const user = await this.userService.getUserByUsername(tokenData.username);

    const updatedTask = await this.prismaService.task.update({
      where: {id: Number(taskId)},
      include: {users: true},
      data: {
        completed: true,
        complete_user: user.username
      },
    });
    return updatedTask;

  }
}
