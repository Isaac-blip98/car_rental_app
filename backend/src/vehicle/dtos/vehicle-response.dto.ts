import { Vehicle, VehicleImage } from '@prisma/client';

export class VehicleResponseDto {
  id: string;
  title: string;
  description?: string;
  location: string;
  dailyRate: number;
  hourlyRate: number;
  isAvailable: boolean;
  fuelType: string;
  transmission: string;
  ac: boolean;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
  imageUrls: string[];

  constructor(vehicle: Vehicle & { images: VehicleImage[] }) {
    Object.assign(this, vehicle);
    this.imageUrls = vehicle.images.map((img) => img.url);
  }
}
