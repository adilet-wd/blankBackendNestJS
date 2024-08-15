import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAttributeValueDto {
  @ApiProperty({example: "Цвет", description: "Название характеристики"})
  @IsString({ message: "Должно быть строкой" })
  readonly attribute_name: string;
  @ApiProperty({example: "Красный", description: "Значение характеристики"})
  @IsString({ message: "Должно быть строкой" })
  readonly value: string
}