import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { VehicleFeatureController } from 'src/vehicle-feature/vehicle-feature.controller';
import { VehicleFeatureService } from 'src/vehicle-feature/vehicle-feature.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { VehicleFeatureModule } from 'src/vehicle-feature/vehicle-feature.module';

@Module({
  imports: [PrismaModule, CloudinaryModule, VehicleFeatureModule],
  providers: [VehicleService, VehicleFeatureService, PrismaService],
  controllers: [VehicleController, VehicleFeatureController],
  exports: [VehicleService],
})
export class VehicleModule {}
