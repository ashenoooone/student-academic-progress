import { ApiProperty } from '@nestjs/swagger';

export class AuthUserDto {
  @ApiProperty({ default: '79999999999' })
  login: string;
  @ApiProperty({ default: 'Password123' })
  password: string;
}
