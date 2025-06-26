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
