import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateVehicleCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
