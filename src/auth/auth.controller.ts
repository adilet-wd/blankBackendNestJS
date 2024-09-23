import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { TokenPayload } from './interfaces/token-payload.interface';
import { RefreshJwtGuard } from './guards/refresh-jwt.guard';
import { LoginUserDto } from './dto/login-auth.dto';
import { UserService } from '../user/user.service';
import { CheckEmailDto } from './dto/check-email.dto';
import { CheckUsernameDto } from './dto/check-username.dto';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UserService) {}

  @ApiOperation({summary: "Login"})
  @Post('/login')
  @UseGuards(LocalGuard)
  async loginPartner(@Body() userDto: LoginUserDto, @Req() req: Request) {
    return req.user;
  }

  @ApiOperation({summary: "Register"})
  @Post('/register')
  registration(@Body() userDto: CreateUserDto){
    return this.authService.registration(userDto);
  }

  @ApiOperation({summary: "Refresh access token"})
  @Get('/refresh')
  @UseGuards(RefreshJwtGuard)
  async refreshAccessToken(@Req() req: Request) {
    const payload = req.user as TokenPayload;
    return this.authService.refreshAccessToken(payload);
  }

  @ApiOperation({summary: "Check does user with this username exists"})
  @Post('/check-username')
  checkUsername(@Body() dto: CheckUsernameDto){
    return this.userService.userWithUsernameExists(dto.username);
  }

  @ApiOperation({summary: "Check does user with this email exists"})
  @Post('/check-email')
  checkEmail(@Body() dto: CheckEmailDto){
    return this.userService.userWithEmailExists(dto.email);
  }

}
