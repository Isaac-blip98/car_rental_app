export interface Vehicle {
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
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}
