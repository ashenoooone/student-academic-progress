import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsOptional, IsInt } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Логин студента' })
  @IsString()
  login: string;

  @ApiProperty({ description: 'Пароль студента' })
  @IsString()
  @MinLength(6, { message: 'Пароль должен содержать не менее 6 символов' })
  password: string;

  @ApiProperty({ description: 'Имя студента' })
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'Фамилия студента' })
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'Отчество студента', required: false })
  @IsOptional()
  @IsString()
  patronymic?: string;

  @ApiProperty({ description: 'Год поступления' })
  @IsInt()
  enrollmentYear: number;

  @ApiProperty({ description: 'ID группы' })
  @IsInt()
  groupId: number;
}
