import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePartnerDto {
    @ApiProperty({ example: "ADM", description: "Наименование бренда" })
    @IsNotEmpty({ message: 'brand_name не должна быть пустым' })
    @IsString({ message: "Должно быть строкой" })
    readonly brand_name: string;

    @ApiProperty({ example: "adm@gmail.com", description: "Адрес электронной почты" })
    @IsNotEmpty({ message: 'email не должна быть пустым' })
    @IsString({ message: "Должно быть строкой" })
    readonly email: string;

    @ApiProperty({ example: "БЦ Ордо", description: "Адрес главного офиса" })
    @IsNotEmpty({ message: 'address не должна быть пустым' })
    @IsString({ message: "Должно быть строкой" })
    readonly address: string;

    @ApiProperty({ example: "Adm marketing group", description: "Название организации" })
    @IsNotEmpty({ message: 'organization не должна быть пустым' })
    @IsString({ message: "Должно быть строкой" })
    readonly organization: string;

    @ApiProperty({ example: "772212345678", description: "ИНН организации" })
    @IsNotEmpty({ message: 'inn не должна быть пустым' })
    @IsString({ message: "Должно быть строкой" })
    readonly inn: string;


    @ApiProperty({ example: "996557662291", description: "Номер телефона организации" })
    @IsNotEmpty({ message: 'phone_number не должна быть пустым' })
    @IsString({ message: "Должно быть строкой" })
    readonly phone_number: string;

    @ApiProperty({ example: "@adilet_wd", description: "Социальные сети организации" })
    @IsNotEmpty({ message: 'socials не должна быть пустым' })
    @IsString({ message: "Должно быть строкой" })
    readonly socials: string;

    @ApiProperty({ example: "Пн, Вт, Ср, Чт, Пт, СБ", description: "Расписание работы" })
    @IsNotEmpty({ message: 'schedule не должна быть пустым' })
    @IsString({ message: "Должно быть строкой" })
    readonly schedule: string;

    @ApiProperty({ example: "Магазин", description: "Вид активности" })
    @IsNotEmpty({ message: 'type_of_activity не должна быть пустым' })
    @IsString({ message: "Должно быть строкой" })
    readonly type_of_activity: string;

    @ApiProperty({ example: "Магазин детских игрушек", description: "Описание" })
    @IsNotEmpty({ message: 'description не должна быть пустым' })
    @IsString({ message: "Должно быть строкой" })
    readonly description: string;

    @ApiProperty({ example: "dfge2Fd234", description: "Пароль" })
    @IsNotEmpty({ message: 'password не должна быть пустым' })
    @IsString({ message: "Должно быть строкой" })
    readonly password: string;
}