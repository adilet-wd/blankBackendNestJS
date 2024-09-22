import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CheckEmailDto {
  @ApiProperty({ example: "brics@gmail.com", description: "Email" })
  @IsNotEmpty({ message: 'email should not be empty' })
  @IsString({ message: 'Email should be a string' })
  @IsEmail({}, {message: "Should be an email"})
  readonly email: string;
}