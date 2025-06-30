import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVehicleDto } from './dtos/create-vehicle.dto';
import { VehicleResponseDto } from './dtos/vehicle-response.dto';

@Injectable()
export class VehicleService {
  constructor(private prisma: PrismaService) {}

  async create(
    dto: CreateVehicleDto & { imageUrls: string[] },
  ): Promise<VehicleResponseDto> {
    const { imageUrls = [], categoryId, ...vehicleData } = dto;
    const categoryRecord = await this.prisma.vehicleCategory.findUnique({
      where: { id: categoryId },
    });
    if (!categoryRecord) {
      throw new Error(`Category with ID '${categoryId}' not found`);
    }
    const vehicle = await this.prisma.vehicle.create({
      data: {
        ...vehicleData,
        categoryId,
        images: {
          create: imageUrls.map((url, i) => ({
            url,
            isPrimary: i === 0,
          })),
        },
      },
      include: {
        images: true,
        category: true,
      },
    });

    return new VehicleResponseDto(vehicle);
  }

  async findAll(): Promise<VehicleResponseDto[]> {
    const vehicles = await this.prisma.vehicle.findMany({
      include: {
        images: true,
        category: true,
      },
    });

    return vehicles.map((v) => new VehicleResponseDto(v));
  }

  async findOne(id: string): Promise<VehicleResponseDto> {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id },
      include: { images: true, category: true },
    });

    if (!vehicle) throw new NotFoundException('Vehicle not found');
    return new VehicleResponseDto(vehicle);
  }

  async delete(id: string) {
    return this.prisma.vehicle.delete({ where: { id } });
  }

  async updateAvailability(id: string, isAvailable: boolean) {
    return this.prisma.vehicle.update({
      where: { id },
      data: { isAvailable },
    });
  }
}
