import { Booking } from '@prisma/client';
import { IBooking } from '../interfaces/booking.interface';

export class BookingResponseDto implements IBooking {
  id: string;
  userId: string;
  vehicleId: string;
  startDate: Date;
  endDate: Date;
  status: any;
  isInstant: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(booking: Booking) {
    Object.assign(this, booking);
  }
}
