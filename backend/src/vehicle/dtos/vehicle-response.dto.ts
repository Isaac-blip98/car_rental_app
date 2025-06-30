import { Vehicle, VehicleImage } from '@prisma/client';

export class VehicleResponseDto {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  seatingCapacity: number;
  description?: string;
  location: string;
  dailyRate: number;
  hourlyRate: number;
  isAvailable: boolean;
  fuelType: string;
  transmission: string;
  ac: boolean;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  imageUrls: string[];

  constructor(vehicle: Vehicle & { images: VehicleImage[]; category: { name: string } }) {
    this.id = vehicle.id;
    this.title = vehicle.title;
    this.brand = vehicle.brand;
    this.model = vehicle.model;
    this.year = vehicle.year;
    this.seatingCapacity = vehicle.seatingCapacity;
    this.description = vehicle.description || undefined;
    this.location = vehicle.location;
    this.dailyRate = vehicle.dailyRate;
    this.hourlyRate = vehicle.hourlyRate;
    this.isAvailable = vehicle.isAvailable;
    this.fuelType = vehicle.fuelType;
    this.transmission = vehicle.transmission;
    this.ac = vehicle.ac;
    this.category = vehicle.category.name;
    this.createdAt = vehicle.createdAt;
    this.updatedAt = vehicle.updatedAt;
    this.imageUrls = vehicle.images.map((img) => img.url);
  }
}
