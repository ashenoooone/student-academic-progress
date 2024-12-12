import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class StudentAuthDto {
  @ApiProperty()
  @Type(() => String)
  login: string;

  @Type(() => String)
  @ApiProperty()
  password: string;
}
