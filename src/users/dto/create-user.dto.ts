import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

import { User } from '@entities/user';
import { randomUUID, RandomUUIDOptions } from 'crypto';

export class CreateUserDto implements Partial<User> {
  @IsNotEmpty()
  @IsUUID()
  uid: typeof randomUUID;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  confirmPassword: string;
}
