import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCarDto {
  @ApiProperty({
    example: 'Mercedes-Benz',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({
    example: 'White',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  color: string;
}
