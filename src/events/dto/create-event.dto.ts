import {
  IsNotEmpty,
  IsDate,
  IsOptional,
  IsInstance,
  IsAlphanumeric,
  IsDateString,
  isDate,
  isEmail,
  isAlpha,
  isNumber,
  isBoolean,
  IsUUID,
  isEmpty,
  isIn,
  isObject,
  isArray,
  isInstance,
  isHash,
  isNotEmptyObject,
  isNotEmpty,
  IsLocale,
  isDataURI,
} from 'class-validator';

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
