import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { VehicleController } from './vehicle/vehicle.controller';
import { VehicleService } from './vehicle/vehicle.service';
import { VehicleModule } from './vehicle/vehicle.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, VehicleModule],
  controllers: [AppController, VehicleController],
  providers: [AppService, VehicleService],
})
export class AppModule {}
