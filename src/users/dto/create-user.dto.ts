import type { RandomUUIDOptions } from 'crypto';
import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';

import { User } from '@entities/user';

export class CreateUserDto implements Partial<User> {
  @IsNotEmpty()
  @IsUUID()
  uid: (opts?: RandomUUIDOptions) => string;

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
