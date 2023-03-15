import { Event } from '../../database/entities/event.entity';
import { IsAlphanumeric, IsArray, isArray, IsDateString } from 'class-validator';
import { User } from '../../database/entities/user.entity';
export class UpdateEventDto implements Partial<Event> {
  public title?: string;

  public description?: string;

  @IsDateString()
  public when?: Date;

  @IsAlphanumeric()
  public location?: string;

  public organizer?: User | string;

  @IsArray()
  public attendees?: Array<User | string | null>;
}
