import { IsString, IsBoolean, IsNumber, IsArray } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  title: string;

  @IsString()
  location: string;

  @IsNumber()
  dailyRate: number;

  @IsNumber()
  hourlyRate: number;

  @IsBoolean()
  isAvailable: boolean;

  @IsString()
  fuelType: string;

  @IsString()
  transmission: string;

  @IsBoolean()
  ac: boolean;

  @IsString()
  categoryId: string;

  @IsString()
  description?: string;

  @IsArray()
  imageUrls: string[];
}
