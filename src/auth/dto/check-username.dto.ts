import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CheckUsernameDto {
  @ApiProperty({ example: "AdiletWD", description: "Username" })
  @IsNotEmpty({ message: 'username should not be empty' })
  @IsString({ message: 'Username should be a string' })
  readonly username: string;
}