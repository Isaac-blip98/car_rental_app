import { Module } from '@nestjs/common';
import { VehicleCategoryService } from './vehicle-category.service';
import { VehicleCategoryController } from './vehicle-category.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [VehicleCategoryService, PrismaService],
  controllers: [VehicleCategoryController],
})
export class VehicleCategoryModule {}
