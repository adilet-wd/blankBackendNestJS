import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { Request } from 'express';
import { TokenPayload } from '../auth/interfaces/token-payload.interface';

@ApiTags("Users")
@Controller('/api/user')
export class UserController {
  constructor(private userService: UserService) {
  }

  @ApiOperation({summary: "Get all users"})
  @Get('/')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({summary: "Get user info by Token"})
  @Get('/myProfile')
  @UseGuards(JwtGuard)
  async getMyProfile(@Req() req: Request) {
    const payload = req.user as TokenPayload;
    return this.userService.getUserByToken(payload);
  }

}

