import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { BookingResponseDto } from './dtos/booking-response.dto';
import { BookingStatus } from '@prisma/client';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBookingDto, userId: string): Promise<BookingResponseDto> {
    const startDate = new Date(dto.startDate);
    const endDate = new Date(dto.endDate);

    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id: dto.vehicleId },
    });

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    if (!vehicle.isAvailable) {
      throw new ForbiddenException('Vehicle is currently unavailable');
    }

    const overlappingBooking = await this.prisma.booking.findFirst({
      where: {
        vehicleId: dto.vehicleId,
        status: {
          in: ['PENDING', 'APPROVED'],
        },
        OR: [
          {
            startDate: {
              lte: endDate,
            },
            endDate: {
              gte: startDate,
            },
          },
        ],
      },
    });

    if (overlappingBooking) {
      throw new ForbiddenException('Vehicle is already booked for this period');
    }

    const booking = await this.prisma.booking.create({
      data: {
        userId,
        vehicleId: dto.vehicleId,
        startDate,
        endDate,
        isInstant: dto.isInstant,
      },
    });

    return new BookingResponseDto(booking);
  }

  async findAllBookings(): Promise<BookingResponseDto[]> {
    const bookings = await this.prisma.booking.findMany({
      include: { vehicle: true, user: true },
    });
    return bookings.map((b) => new BookingResponseDto(b));
  }

  async findById(id: string): Promise<BookingResponseDto> {
    const booking = await this.prisma.booking.findUnique({ where: { id } });
    if (!booking) throw new NotFoundException('Booking not found');
    return new BookingResponseDto(booking);
  }

  async findMyBookings(userId: string): Promise<BookingResponseDto[]> {
    const bookings = await this.prisma.booking.findMany({
      where: { userId },
      include: { vehicle: true },
    });
    return bookings.map((b) => new BookingResponseDto(b));
  }

  async updateStatus(
    id: string,
    status: BookingStatus,
  ): Promise<BookingResponseDto> {
    const booking = await this.prisma.booking.update({
      where: { id },
      data: { status },
    });

    return new BookingResponseDto(booking);
  }

  async filterBookings(params: {
    userId?: string;
    vehicleId?: string;
    status?: BookingStatus;
  }): Promise<BookingResponseDto[]> {
    const bookings = await this.prisma.booking.findMany({
      where: {
        userId: params.userId,
        vehicleId: params.vehicleId,
        status: params.status,
      },
    });

    return bookings.map((b) => new BookingResponseDto(b));
  }

  async cancelBooking(id: string, user: any): Promise<BookingResponseDto> {
    const booking = await this.prisma.booking.findUnique({ where: { id } });

    if (!booking) throw new NotFoundException('Booking not found');

    const isOwner = booking.userId === user.id;
    const isPrivileged = user.role === 'ADMIN' || user.role === 'AGENT';

    if (!isOwner && !isPrivileged) {
      throw new ForbiddenException('You cannot cancel this booking');
    }

    if (booking.status === 'COMPLETED') {
      throw new ForbiddenException('Cannot cancel a completed booking');
    }

    const now = new Date();
    const startTime = new Date(booking.startDate);
    const diffInMs = startTime.getTime() - now.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);

    if (diffInHours < 1) {
      throw new ForbiddenException(
        'Cannot cancel less than 1 hour before start time',
      );
    }

    const cancelled = await this.prisma.booking.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });

    return new BookingResponseDto(cancelled);
  }

  async approveBooking(id: string): Promise<BookingResponseDto> {
    const booking = await this.prisma.booking.update({
      where: { id },
      data: { status: 'APPROVED' },
    });
    return new BookingResponseDto(booking);
  }

  async rejectBooking(id: string): Promise<BookingResponseDto> {
    const booking = await this.prisma.booking.update({
      where: { id },
      data: { status: 'REJECTED' },
    });
    return new BookingResponseDto(booking);
  }
}
