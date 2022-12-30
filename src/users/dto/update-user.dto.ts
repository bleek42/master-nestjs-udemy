import { User } from '@entities/user';

export class UpdateUserDto implements Partial<User> {
  id: number;

  public username?: string;

  email?: string;

  isAdmin: string;
}
