import { IsNotEmpty, IsDate, IsOptional, IsInstance } from 'class-validator';

export class CreateEventDto {
  @IsOptional()
  title: string;

  @IsOptional()
  description: string;

  @IsDate()
  @IsOptional()
  when: Date;

  @IsOptional()
  location: string;

  @IsOptional()
  organizer: string;
}
