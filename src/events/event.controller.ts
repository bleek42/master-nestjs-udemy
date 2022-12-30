import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';

import { Event } from '@entities/event.entity';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe';
import { Query } from 'typeorm/driver/Query.js';
import { Request } from 'express';
import { Req } from '@nestjs/common/decorators/index';

@Controller('events')
export class EventController {
  private readonly logger = new Logger();
  constructor(private readonly eventService: EventService) {}

  @Post('new')
  public async postEvent(@Req() req: Request, @Body() body: CreateEventDto): Promise<void> {
    this.logger.debug(body);
    if (body?.title && body?.description && body?.location && body?.when && body?.organizer) {
      await this.eventService.create(body);
    }
  }

  @Get()
  public async getAllEvents(@Req() req: Request) {
    this.logger.log(`GET /api/events req. obj: ${JSON.stringify(req)}`);
    if (req) return await this.eventService.findAll();
  }

  @Get(':id')
  public async getEventById(@Param('id', ParseIntPipe) id: number) {
    return this.eventService.findById(id);
  }

  @Patch(':id')
  public async updateEvent(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateEventDto) {
    const existingEvent = await this.eventService.findById(id);
    return existingEvent ?? (await this.eventService.update(id, body));
  }

  @Delete(':id')
  public async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.eventService.remove(id);
  }
}
