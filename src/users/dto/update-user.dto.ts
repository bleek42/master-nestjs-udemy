import { User } from '../../database/entities/user.entity';
import { Event } from '../../database/entities/event.entity';

export class UpdateUserDto implements Partial<User> {
  public id: number;

  public email: string;

  public isAdmin: boolean;

  upcomingEvents?: Event[] | Event;

  pastEvents?: Event[] | Event;
}
