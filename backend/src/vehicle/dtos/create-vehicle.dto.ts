import { FuelType, Transmission } from '@prisma/client';
import { IsString, IsBoolean, IsNumber, IsEnum, IsArray, IsOptional } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  title: string;

  @IsString()
  brand: string;

  @IsString()
  location: string;

  @IsString()
  model: string;

  @IsNumber()
  year: number;

  @IsNumber()
  seatingCapacity: number;

  @IsNumber()
  dailyRate: number;

  @IsNumber()
  hourlyRate: number;

  @IsBoolean()
  isAvailable: boolean;

  @IsEnum(FuelType)
  fuelType: FuelType;

  @IsEnum(Transmission)
  transmission: Transmission;

  @IsBoolean()
  ac: boolean;

  @IsString()
  categoryId: string;

  @IsString()
  description?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  imageUrls?: string[];
}
