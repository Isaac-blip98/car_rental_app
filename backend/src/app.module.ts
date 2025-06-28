import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { VehicleController } from './vehicle/vehicle.controller';
import { VehicleService } from './vehicle/vehicle.service';
import { VehicleModule } from './vehicle/vehicle.module';
import { BookingService } from './booking/booking.service';
import { BookingController } from './booking/booking.controller';
import { BookingModule } from './booking/booking.module';
import { VehicleCategoryService } from './vehicle-category/vehicle-category.service';
import { VehicleCategoryController } from './vehicle-category/vehicle-category.controller';
import { VehicleFeatureService } from './vehicle-feature/vehicle-feature.service';
import { VehicleFeatureController } from './vehicle-feature/vehicle-feature.controller';
import { VehicleFeatureModule } from './vehicle-feature/vehicle-feature.module';
import { VehicleCategoryModule } from './vehicle-category/vehicle-category.module';
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, VehicleModule, BookingModule, VehicleFeatureModule, VehicleCategoryModule, AdminModule],
  controllers: [AppController, VehicleController, BookingController, VehicleCategoryController, VehicleFeatureController, AdminController],
  providers: [AppService, VehicleService, BookingService, VehicleCategoryService, VehicleFeatureService, AdminService],
})
export class AppModule {}
