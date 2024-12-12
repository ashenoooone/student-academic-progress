import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthUserDto } from './dto/auth-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { AccessGuard } from './guards/access.guard';
import { RequestWithUser } from 'src/@types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: AuthUserDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Авторизация пользователя',
  })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@Body() dto: AuthUserDto) {
    return this.authService.signin(dto);
  }

  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Регистрация пользователя',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signup(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @UseGuards(AccessGuard)
  @Get('/check')
  check(@Req() request: RequestWithUser) {
    return this.authService.check(request.user.id);
  }
}
