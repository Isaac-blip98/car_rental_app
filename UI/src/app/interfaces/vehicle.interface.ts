export interface IVehicle {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  seatingCapacity: number;
  description?: string;
  imageUrls: string[];
  location: string;
  dailyRate: number;
  hourlyRate: number;
  isAvailable: boolean;
  fuelType: string;
  transmission: string;
  ac: boolean;
  category?: string;
  createdAt: Date;
  updatedAt: Date;
}
