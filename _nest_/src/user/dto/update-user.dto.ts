import { PartialType } from '@nestjs/mapped-types';

import { CreateUserDto } from './create-user.dto';
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

export class UpdateUserDto extends PartialType(CreateUserDto) {
  firstName: string;
  surName: string;
  email: string;
  age: number;
  city: string;
  isConfirm: boolean;
}
