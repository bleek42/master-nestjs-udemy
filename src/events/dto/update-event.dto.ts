import { Event } from '@entities/event';
import { isArray } from 'class-validator';
import { User } from '../../database/entities/user.entity';
export class UpdateEventDto implements Partial<Event> {
  public title?: string;

  public description?: string;

  public when?: Date;

  public location?: string;

  public organizer?: User | string;

  public attendees?: Array<User | string | null>;
}
