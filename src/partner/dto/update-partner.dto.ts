import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdatePartnerDto {
  @ApiProperty({ example: "ADM", description: "Наименование бренда" })
  @IsString({ message: "Должно быть строкой" })
  readonly brand_name: string;

  @ApiProperty({ example: "adm@gmail.com", description: "Адрес электронной почты" })
  @IsString({ message: "Должно быть строкой" })
  readonly email: string;

  @ApiProperty({ example: "БЦ Ордо", description: "Адрес главного офиса" })
  @IsString({ message: "Должно быть строкой" })
  readonly address: string;

  @ApiProperty({ example: "Adm marketing group", description: "Название организации" })
  @IsString({ message: "Должно быть строкой" })
  readonly organization: string;

  @ApiProperty({ example: "772212345678", description: "ИНН организации" })
  @IsString({ message: "Должно быть строкой" })
  readonly inn: string;


  @ApiProperty({ example: "996557662291", description: "Номер телефона организации" })
  @IsString({ message: "Должно быть строкой" })
  readonly phone_number: string;

  @ApiProperty({ example: "@adilet_wd", description: "Социальные сети организации" })
  @IsString({ message: "Должно быть строкой" })
  readonly socials: string;

  @ApiProperty({ example: "Пн, Вт, Ср, Чт, Пт, СБ", description: "Расписание работы" })
  @IsString({ message: "Должно быть строкой" })
  readonly schedule: string;

  @ApiProperty({ example: "Магазин", description: "Вид активности" })
  @IsString({ message: "Должно быть строкой" })
  readonly type_of_activity: string;

  @ApiProperty({ example: "Магазин детских игрушек", description: "Описание" })
  @IsString({ message: "Должно быть строкой" })
  readonly description: string;

  @ApiProperty({ example: "dfge2Fd234", description: "Пароль" })
  @IsString({ message: "Должно быть строкой" })
  readonly password: string;
}