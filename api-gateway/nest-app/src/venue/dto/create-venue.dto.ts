import { IsString, IsNotEmpty, IsOptional, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAvailableSlotDto } from './create-available-slot.dto';

export class CreateVenueDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAvailableSlotDto)
  slots?: CreateAvailableSlotDto[];
}