import { IsUUID, IsDateString, IsBoolean } from 'class-validator';

export class CreateBookingDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  vehicleId: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsBoolean()
  isInstant: boolean;
}
