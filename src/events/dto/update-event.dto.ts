import { Event } from '../../database/entities/event.entity';
import { IsArray, isArray } from 'class-validator';
import { User } from '../../database/entities/user.entity';
export class UpdateEventDto implements Partial<Event> {
  public title?: string;

  public description?: string;

  public when?: Date;

  public location?: string;

  public organizer?: User | string;

  @IsArray()
  public attendees?: Array<User | string | null>;
}
