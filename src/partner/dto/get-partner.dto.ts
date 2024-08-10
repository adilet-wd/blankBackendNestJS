import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetPartnerDto {
  @ApiProperty({ example: "ADM", description: "Наименование бренда" })
  @IsString({message: "Должно быть строкой"})
  readonly brand_name: string;
}