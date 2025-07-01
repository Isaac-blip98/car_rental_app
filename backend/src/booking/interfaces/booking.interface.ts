import { BookingStatus } from "@prisma/client";

export interface VehicleSummary {
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
}

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
  vehicle: VehicleSummary;
}
