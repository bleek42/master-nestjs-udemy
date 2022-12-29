import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

import { User } from '@entities/user';

export class UpdateUserDto implements Partial<User> {}
