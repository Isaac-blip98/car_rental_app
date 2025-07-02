import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppMailerModule } from 'src/mailer/mailer.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    AppMailerModule, 
  ],
  controllers: [BookingController],
  providers: [BookingService, PrismaService],
})
export class BookingModule {}
