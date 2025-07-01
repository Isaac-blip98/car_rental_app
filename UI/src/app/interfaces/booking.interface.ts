import { IVehicleSummary } from './vehicle-summary.interface';

export interface Booking {
  id: string;
  vehicle: IVehicleSummary;
  startDate: string;
  endDate: string;
  status: 'PENDING' | 'APPROVED' | 'CONFIRMED' | 'REJECTED' | 'CANCELLED';
  totalPrice?: number;
  bookingDate: string;
  pickupLocation?: string;
  createdAt?: string;
  imageError?: boolean;
}
