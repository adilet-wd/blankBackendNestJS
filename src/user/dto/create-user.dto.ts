import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length, Matches, MaxLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: "AdiletWD", description: "Username" })
  @IsNotEmpty({ message: 'username should not be empty' })
  @IsString({ message: 'Name should be a string' })
  @Matches(/^[a-zA-Z]+[a-zA-Z0-9]*$/, { message: 'Name must be in Latin letters and can optionally contain numbers' })@IsString({ message: 'Should be a string' })
  @Length(1, 16, { message: 'Must be at least 1 character and no longer than 16' })
  readonly username: string;

  @ApiProperty({ example: "brics@gmail.com", description: "Email" })
  @IsNotEmpty({ message: 'email should not be empty' })
  @IsString({ message: 'Email should be a string' })
  @IsEmail({}, {message: "Should be an email"})
  readonly email: string;

  @ApiProperty({ example: "Adilet", description: "Name" })
  @IsNotEmpty({ message: 'Name should not be empty' })
  @IsString({ message: 'Name should be a string' })
  @Matches(/^[^0-9]+$/, { message: 'Name should not contain numbers' })
  @Matches(/^[a-zA-Z]+$/, { message: 'Name must be in Latin letters' })
  @Length(1, 16, { message: 'Must be at least 1 character and no longer than 16' })
  readonly name: string;

  @ApiProperty({ example: "Usenkanov", description: "Surname" })
  @IsNotEmpty({ message: 'Surname should not be empty' })
  @IsString({ message: 'Surname should be a string' })
  @Matches(/^[^0-9]+$/, { message: 'Surname should not contain numbers' })
  @Matches(/^[a-zA-Z]+$/, { message: 'Surname must be in Latin letters' })
  @Length(1, 20, { message: 'Must be at least 1 character and no longer than 20' })
  readonly surname: string;

  @ApiProperty({ example: "dfge2Fd234", description: "Password" })
  @IsNotEmpty({ message: 'Password should not be empty' })
  @IsString({message: "Password should be a string"})
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, { message: 'Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 digit, and be at least 8 characters long' })
  @MaxLength(30, { message: 'Password must be no more than 30 characters long' })
  readonly password: string;
}