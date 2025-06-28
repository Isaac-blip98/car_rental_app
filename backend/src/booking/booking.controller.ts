import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UseGuards,
  Query,
  Req,
  Patch,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UpdateBookingStatusDto } from './dtos/update-booking-status.dto';
import { Role } from 'src/common/enums/roles.enum';
import { BookingStatus } from '@prisma/client';

@Controller('bookings')
@UseGuards(JwtAuthGuard)
export class BookingController {
  constructor(private bookingService: BookingService) {}
  
@Post()
create(@Body() dto: CreateBookingDto, @Req() req: any) {
  return this.bookingService.create(dto, req.user.userId);
}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getBookings(@Req() req: any) {
    const user = req.user;
    if (user.role === Role.CUSTOMER) {
      return this.bookingService.findMyBookings(user.userId);
    } else {
      return this.bookingService.findAllBookings();
    }
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.bookingService.findById(id);
  }

  @Post(':id/status')
  @Roles(Role.ADMIN, Role.AGENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  updateStatus(@Param('id') id: string, @Body() dto: UpdateBookingStatusDto) {
    return this.bookingService.updateStatus(id, dto.status);
  }

  @Get('filter')
  @UseGuards(JwtAuthGuard)
  filterBookings(
    @Query('userId') userId?: string,
    @Query('vehicleId') vehicleId?: string,
    @Query('status') status?: BookingStatus,
  ) {
    return this.bookingService.filterBookings({ userId, vehicleId, status });
  }

  @Post(':id/cancel')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.AGENT, Role.CUSTOMER)
  cancelBooking(@Param('id') id: string, @Req() req: any) {
    return this.bookingService.cancelBooking(id, req.user);
  }

  @Patch(':id/approve')
  @Roles(Role.ADMIN, Role.AGENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  approve(@Param('id') id: string) {
    return this.bookingService.approveBooking(id);
  }

  @Patch(':id/reject')
  @Roles(Role.ADMIN, Role.AGENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  reject(@Param('id') id: string) {
    return this.bookingService.rejectBooking(id);
  }
}
