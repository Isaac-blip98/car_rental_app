import { Module } from '@nestjs/common';
import { VehicleFeatureService } from './vehicle-feature.service';
import { VehicleFeatureController } from './vehicle-feature.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [VehicleFeatureService, PrismaService],
  controllers: [VehicleFeatureController],
  exports: [VehicleFeatureService]
})
export class VehicleFeatureModule {}
