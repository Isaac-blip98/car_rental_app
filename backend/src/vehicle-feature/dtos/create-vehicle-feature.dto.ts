import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVehicleFeatureDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
