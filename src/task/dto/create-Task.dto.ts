import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Length, Matches } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: "New informational post", description: "Title" })
  @IsNotEmpty({ message: 'title should not be empty' })
  @IsString({ message: 'title should be a string' })
  @Matches(/^[a-zA-Z]+[a-zA-Z0-9 ]*$/, { message: 'Title must be in Latin letters, can optionally contain numbers, and may include spaces' })
  @Length(1, 50, { message: 'Must be at least 1 character and no longer than 50' })
  readonly title: string;

  @ApiProperty({ example: "Description of new informational post", description: "Description" })
  @IsNotEmpty({ message: 'description should not be empty' })
  @IsString({ message: 'description should be a string' })
  @Length(1, 350, { message: 'Must be at least 1 character and no longer than 350' })
  readonly description: string;

  @ApiProperty({ example: 1, description: "Group ID" })
  @IsNotEmpty({ message: 'group_id should not be empty' })
  @IsNumber({}, { message: 'group_id should be a number' })
  readonly group_id: number;
}