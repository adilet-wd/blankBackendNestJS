import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { Request } from 'express';
import { TokenPayload } from '../auth/interfaces/token-payload.interface';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';

@ApiTags('Group')
@Controller('/api/group')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @ApiOperation({summary: "Get group by id"})
  @Get('/:id')
  async getGroup(@Param('id') id: number) {
    return this.groupService.getGroup(id);
  }

  @ApiOperation({summary: "Get all groups"})
  @Get('/')
  async getAllGroups() {
    return this.groupService.getAllGroups();
  }

  @ApiOperation({summary: "Create group"})
  @Post('/create')
  @UseGuards(JwtGuard)
  async createGroup(@Body() postDto: CreateGroupDto, @Req() req: Request) {
    const payload = req.user as TokenPayload;
    return this.groupService.createGroup(postDto, payload);
  }

}
