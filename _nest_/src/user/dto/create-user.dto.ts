import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'Boris',
    required: false,
  })
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiProperty({
    example: 'JohnsonUK',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  surName: string;

  @ApiProperty({
    example: 'MALE',
    required: false,
  })
  @IsString()
  @IsOptional()
  gender: string;

  @ApiProperty({
    example: 'boris-johnson@org.uk',
    uniqueItems: true,
    required: true,
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'p@sS_w_0rd',
    required: true,
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: Math.ceil(Math.random() * 100) + 16,
    required: false,
  })
  @IsNumber()
  @Min(16)
  age: number;

  @ApiProperty({
    example: 'New York City',
    required: false,
  })
  @IsString()
  @IsOptional()
  city: string;

  @ApiProperty({
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isConfirm: boolean;
}
