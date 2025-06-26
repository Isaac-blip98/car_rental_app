import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVehicleDto } from './dtos/create-vehicle.dto';
import { VehicleResponseDto } from './dtos/vehicle-response.dto';
import { Vehicle, VehicleImage } from '@prisma/client';

@Injectable()
export class VehicleService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateVehicleDto): Promise<VehicleResponseDto> {
    const { imageUrls, ...vehicleData } = dto;

    const vehicle = await this.prisma.vehicle.create({
      data: {
        ...vehicleData,
        images: {
          create: imageUrls.map((url, index) => ({
            url,
            isPrimary: index === 0, 
          })),
        },
      },
      include: {
        images: true,
      },
    });

    return new VehicleResponseDto(vehicle);
  }

  async findAll(): Promise<VehicleResponseDto[]> {
    const vehicles = await this.prisma.vehicle.findMany({
      include: {
        images: true,
      },
    });

    return vehicles.map((v) => new VehicleResponseDto(v));
  }

  async findOne(id: string): Promise<VehicleResponseDto> {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!vehicle) throw new NotFoundException('Vehicle not found');
    return new VehicleResponseDto(vehicle);
  }
}
