import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSubscribeDto {
  @ApiProperty({ example: "2", description: "PostId" })
  @IsNotEmpty({ message: 'postId should not be empty' })
  @IsNumber({}, { message: 'PostId should be a number' })
  readonly post_id: number;
}