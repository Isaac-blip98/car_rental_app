export interface IVehicle {
  id: string;
  title: string;
  description?: string;
  imageUrls: string[];
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
}

export interface Vehicle {
  id: string;
  title: string;
  imageUrls: string[];
  transmission: string;
  seatingCapacity: number;
  category: string;
  dailyRate: number;
  isAvailable: boolean;
}
