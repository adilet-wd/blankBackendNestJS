import { ApiProperty, PartialType } from '@nestjs/swagger';
import { UpdatePartnerDto } from './update-partner.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePartnerByBrandNameDto extends PartialType(UpdatePartnerDto) {
  @ApiProperty({ example: "ADM", description: "Наименование бренда" })
  @IsNotEmpty({ message: 'brand_name не должна быть пустым' })
  @IsString({ message: "Должно быть строкой" })
  brand_name: string;
}