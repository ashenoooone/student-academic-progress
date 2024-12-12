import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional } from 'class-validator';

export class StudentRegisterDto {
  @ApiProperty({ description: 'Логин студента' })
  @IsString()
  login: string;

  @ApiProperty({ description: 'Пароль студента' })
  @IsString()
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
