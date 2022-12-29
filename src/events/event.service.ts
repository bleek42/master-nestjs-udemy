import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from '../database/entities/event.entity';

@Injectable()
export class EventService {
  private readonly logger = new Logger();
  constructor(@InjectRepository(Event) private readonly eventsRepository: Repository<Event>) {}

  public async create(dto: CreateEventDto): Promise<Event> {
    const newEvent = new Event({ ...dto });
    this.logger.debug(newEvent);
    return await this.eventsRepository.save(newEvent);
  }

  findAll() {
    return `This action returns all event`;
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
