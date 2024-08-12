import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginPartnerDto {
    @ApiProperty({ example: "ADM", description: "Наименование бренда" })
    @IsNotEmpty({ message: 'brand_name не должна быть пустым' })
    @IsString({ message: "Должно быть строкой" })
    brand_name: string;

    @ApiProperty({ example: "eiwqei219", description: "Пароль" })
    @IsNotEmpty({ message: 'password не должна быть пустым' })
    @IsString({ message: "Должно быть строкой" })
    password: string;
}