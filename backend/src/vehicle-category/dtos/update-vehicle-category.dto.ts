import { IsOptional, IsString } from 'class-validator';

export class UpdateVehicleCategoryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
