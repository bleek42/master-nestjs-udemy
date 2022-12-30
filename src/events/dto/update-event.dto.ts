import { Event } from '@entities/event';
import { isArray } from 'class-validator';
export class UpdateEventDto implements Partial<Event> {
  public title?: string;

  public description?: string;

  public when?: Date;
}
