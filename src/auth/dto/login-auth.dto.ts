import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
    @ApiProperty({ example: "AdiletWD", description: "Username" })
    @IsNotEmpty({ message: 'username should not be empty' })
    @IsString({ message: 'Username should be a string' })
    readonly username: string;

    @ApiProperty({ example: "dfge2Fd234", description: "Password" })
    @IsNotEmpty({ message: 'Password should not be empty' })
    @IsString({message: "Password should be a string"})
    readonly password: string;
}