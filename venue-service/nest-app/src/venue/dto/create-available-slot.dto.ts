import { IsString, IsNotEmpty, IsOptional, ValidateNested, IsArray } from 'class-validator';

export class CreateAvailableSlotDto {
  @IsString()
  @IsNotEmpty()
  start_time: string;

  @IsString()
  @IsNotEmpty()
  end_time: string;

  @IsOptional()
  is_available?: boolean;
}