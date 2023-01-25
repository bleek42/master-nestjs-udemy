import type { RandomUUIDOptions } from 'crypto';
import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';

import { User } from '../../database/entities/user.entity';

export class CreateUserDto implements Partial<User> {
  @IsNotEmpty()
  @IsUUID()
  uid: (opts?: RandomUUIDOptions) => string;

  @IsNotEmpty()
  handle: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  confirmPassword: string;
}
