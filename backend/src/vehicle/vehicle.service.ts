import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVehicleDto } from './dtos/create-vehicle.dto';
import { VehicleResponseDto } from './dtos/vehicle-response.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class VehicleService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async create(
    dto: CreateVehicleDto,
    images: Express.Multer.File[],
  ): Promise<VehicleResponseDto> {
    const uploadedImages = await Promise.all(
      images.map((file) => this.cloudinary.uploadFile(file)),
    );

    const vehicle = await this.prisma.vehicle.create({
      data: {
        ...dto,
        images: {
          create: uploadedImages.map((img, i) => ({
            url: img.secure_url,
            isPrimary: i === 0,
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
