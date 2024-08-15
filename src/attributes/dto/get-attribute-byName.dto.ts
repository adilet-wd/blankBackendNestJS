import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetAttributeByNameDto {

  @ApiProperty({ example: "Цвет", description: "Название характеристики" })
  @IsString({ message: "Должно быть строкой" })
  readonly name: string;
}