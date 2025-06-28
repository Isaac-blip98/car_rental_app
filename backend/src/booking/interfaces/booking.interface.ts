import { BookingStatus } from '@prisma/client';

export interface IBooking {
  id: string;
  userId: string;
  vehicleId: string;
  startDate: Date;
  endDate: Date;
  status: BookingStatus;
  isInstant: boolean;
  createdAt: Date;
  updatedAt: Date;
}
