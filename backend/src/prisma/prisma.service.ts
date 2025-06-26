import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async cleanDatabase() {
    return this.$transaction([
      this.couponRedemption.deleteMany(),
      this.review.deleteMany(),
      this.payment.deleteMany(),
      this.booking.deleteMany(),
      this.vehicleFeatureMapping.deleteMany(),
      this.vehicleImage.deleteMany(),
      this.availability.deleteMany(),
      this.vehicle.deleteMany(),
      this.vehicleFeature.deleteMany(),
      this.vehicleCategory.deleteMany(),
      this.user.deleteMany(),
      this.coupon.deleteMany(),
    ]);
  }
}
