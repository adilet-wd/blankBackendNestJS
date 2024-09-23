import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: "New informational post", description: "Title" })
  @IsNotEmpty({ message: 'title should not be empty' })
  @IsString({ message: 'title should be a string' })
  @Matches(/^[a-zA-Z]+[a-zA-Z0-9 ]*$/, { message: 'Title must be in Latin letters, can optionally contain numbers, and may include spaces' })
  @Length(1, 16, { message: 'Must be at least 1 character and no longer than 16' })
  readonly title: string;

  @ApiProperty({ example: "Description of new informational post", description: "Description" })
  @IsNotEmpty({ message: 'description should not be empty' })
  @IsString({ message: 'description should be a string' })
  @Length(1, 350, { message: 'Must be at least 1 character and no longer than 350' })
  readonly description: string;
}