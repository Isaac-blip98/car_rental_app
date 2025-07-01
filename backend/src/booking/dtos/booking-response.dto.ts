import { Booking, BookingStatus } from '@prisma/client';
import { IBooking } from '../interfaces/booking.interface';

export class BookingResponseDto implements IBooking {
  id: string;
  userId: string;
  vehicleId: string;
  startDate: Date;
  endDate: Date;
  status: BookingStatus;
  isInstant: boolean;
  createdAt: Date;
  updatedAt: Date;

  vehicle: {
    id: string;
    name: string;
    image: string;
    brand: string;
    model: string;
    fuelType: string;
    transmission: string;
    location: string;
    category: string;
    features: string[];
    images: string[];
  };

  constructor(booking: any) {
    this.id = booking.id;
    this.userId = booking.userId;
    this.vehicleId = booking.vehicleId;
    this.startDate = booking.startDate;
    this.endDate = booking.endDate;
    this.status = booking.status;
    this.isInstant = booking.isInstant;
    this.createdAt = booking.createdAt;
    this.updatedAt = booking.updatedAt;

    const vehicle = booking.vehicle;

    this.vehicle = {
      id: vehicle.id,
      name: vehicle.title,
      image:
        vehicle.images?.find((img: any) => img.isPrimary)?.url ||
        vehicle.images?.[0]?.url ||
        '',
      brand: vehicle.brand,
      model: vehicle.model,
      fuelType: vehicle.fuelType,
      transmission: vehicle.transmission,
      location: vehicle.location,
      category: vehicle.category?.name || '',
      features: vehicle.features?.map((f: any) => f.feature.name) || [],
      images: vehicle.images?.map((img: any) => img.url) || [],
    };
  }
}
