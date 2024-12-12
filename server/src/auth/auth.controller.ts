import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthUserDto } from './dto/auth-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

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
}
