import { FuelType, Transmission } from '@prisma/client';
import { IsString, IsBoolean, IsNumber, IsEnum } from 'class-validator';

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
}
