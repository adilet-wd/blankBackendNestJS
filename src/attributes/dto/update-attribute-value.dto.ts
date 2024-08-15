import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateAttributeValueDto {
  @ApiProperty({example: "Цвет", description: "Название характеристики"})
  @IsString({ message: "Должно быть строкой" })
  readonly attribute_name: string;
  @ApiProperty({example: "Красный", description: "Текущее значение характеристики"})
  @IsString({ message: "Должно быть строкой" })
  readonly current_value: string
  @ApiProperty({example: "Черный", description: "Новое значение характеристики"})
  @IsString({ message: "Должно быть строкой" })
  readonly updated_value: string

}