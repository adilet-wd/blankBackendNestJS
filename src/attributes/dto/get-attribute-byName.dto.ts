import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetAttributeByNameDto {

  @ApiProperty({ example: "Цвет", description: "Название атрибута" })
  @IsString({ message: "Должно быть строкой" })
  name: string;
}