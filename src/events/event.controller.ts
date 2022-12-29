import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';

import { Event } from '../database/entities/event.entity';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('events')
export class EventController {
  private readonly logger = new Logger();
  constructor(private readonly eventService: EventService) {}

  @Post('new')
  public async postEvent(@Body() body: CreateEventDto): Promise<Event> {
    this.logger.debug(body);
    return await this.eventService.create(body);
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }
}
