import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVehicleCategoryDto } from './dtos/create-vehicle-category.dto';
import { UpdateVehicleCategoryDto } from './dtos/update-vehicle-category.dto';

@Injectable()
export class VehicleCategoryService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateVehicleCategoryDto) {
    return this.prisma.vehicleCategory.create({ data: dto });
  }

  findAll() {
    return this.prisma.vehicleCategory.findMany();
  }

  async update(id: string, dto: UpdateVehicleCategoryDto) {
    const category = await this.prisma.vehicleCategory.findUnique({
      where: { id },
    });
    if (!category) throw new NotFoundException('Category not found');

    return this.prisma.vehicleCategory.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: string) {
    const category = await this.prisma.vehicleCategory.findUnique({
      where: { id },
    });
    if (!category) throw new NotFoundException('Category not found');

    const linkedVehicle = await this.prisma.vehicle.findFirst({
      where: { categoryId: id },
    });

    if (linkedVehicle) {
      throw new ConflictException(
        'Category is assigned to one or more vehicles and cannot be deleted',
      );
    }

    return this.prisma.vehicleCategory.delete({ where: { id } });
  }
}
