import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVehicleFeatureDto } from './dtos/create-vehicle-feature.dto';

@Injectable()
export class VehicleFeatureService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateVehicleFeatureDto) {
    return this.prisma.vehicleFeature.create({ data: dto });
  }

  findAll() {
    return this.prisma.vehicleFeature.findMany();
  }

  async delete(id: string) {
    const feature = await this.prisma.vehicleFeature.findUnique({ where: { id } });
    if (!feature) throw new NotFoundException('Feature not found');

    const linked = await this.prisma.vehicleFeatureMapping.findFirst({
      where: { featureId: id },
    });

    if (linked) {
      throw new ConflictException(
        'Feature is assigned to one or more vehicles and cannot be deleted',
      );
    }

    return this.prisma.vehicleFeature.delete({ where: { id } });
  }

}
