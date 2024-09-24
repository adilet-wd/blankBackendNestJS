import { Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { Request } from 'express';
import { TokenPayload } from '../auth/interfaces/token-payload.interface';
import { SubscribeService } from './subscribe.service';

@ApiTags('Subscribe')
@Controller('/api/subscribe')
export class SubscribeController {
  constructor(private subscribeService: SubscribeService) {}

  @ApiOperation({summary: "Get all subscribes"})
  @Get('/group/:id')
  async getGroupSubscribes(@Param('id') id: number) {
    return this.subscribeService.getGroupSubscribes(id);
  }

  @ApiOperation({summary: "Subscribe to group"})
  @Get('/user')
  @UseGuards(JwtGuard)
  async getUserSubscriptions(@Req() req: Request) {
    const payload = req.user as TokenPayload;
    return this.subscribeService.getUserSubscribtions(payload);
  }

  @ApiOperation({summary: "Subscribe to group"})
  @Post('/:id')
  @UseGuards(JwtGuard)
  async createSubscribe(@Param('id') id: number, @Req() req: Request) {
    const payload = req.user as TokenPayload;
    return this.subscribeService.createSubscribe(id, payload);
  }

  @ApiOperation({summary: "Unsubscribe from group"})
  @Delete('/:id')
  @UseGuards(JwtGuard)
  async deleteSubscribe(@Param('id') id: number, @Req() req: Request) {
    const payload = req.user as TokenPayload;
    return this.subscribeService.deleteSubscribe(id, payload);
  }

}
