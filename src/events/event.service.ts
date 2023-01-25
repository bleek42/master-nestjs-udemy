import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from 'src/database/entities/event.entity';
import { User } from 'src/database/entities/user.entity';

@Injectable()
export class EventService {
  private readonly logger = new Logger();
  constructor(@InjectRepository(Event) private readonly eventsRepository: Repository<Event>) {}

  public async create(event: CreateEventDto): Promise<void> {
    const newEvent = new Event(event);
    await this.eventsRepository.save(newEvent);
  }

  public async findAll() {
    return await this.eventsRepository.find({ order: { createdAt: 'asc' } });
  }

  public async findById(id: number) {
    return this.eventsRepository.findOneBy({ id });
  }

  public async findEventsByUserOrganizer(email: string): Promise<Array<Event | User>> {
    const eventDate = new Date();
    this.logger.debug(
      'EventService.findEventsByUserOrganizer debug log:',
      eventDate.toLocaleDateString()
    );
    const userHasEventsOrganized = await this.eventsRepository.find({
      where: { organizer: email, when: eventDate },
    });

    return userHasEventsOrganized ?? userHasEventsOrganized;
  }

  // public async update(id: number, updates: UpdateEventDto) {
  //   const existingEvent = await this.findById(id);
  //   return existingEvent ?? (await this.eventsRepository.update({ id, ...existingEvent }, updates));
  // }

  public async remove(id: number): Promise<void> {
    await this.eventsRepository.delete(id);
  }
}
