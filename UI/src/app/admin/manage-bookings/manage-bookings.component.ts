import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/bookings.service';
import { RouterModule } from '@angular/router';
import { Booking } from '../../interfaces/booking.interface';
import { BookingStatus } from '../../interfaces/booking-status.enum';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-manage-bookings',
  templateUrl: './manage-bookings.component.html',
  imports: [CommonModule, RouterModule, FormsModule],
})
export class ManageBookingsComponent implements OnInit {
  statuses = Object.values(BookingStatus);
  bookings: Booking[] = [];
  loading = true;

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.bookingService.getMyBookings().subscribe({
      next: (data) => {
        this.bookings = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to fetch bookings:', err);
        this.loading = false;
      },
    });
  }

  getStatusLabel(status: string): string {
    const map: { [key: string]: string } = {
      PENDING: 'Pending',
      APPROVED: 'Approved',
      REJECTED: 'Rejected',
      CONFIRMED: 'Confirmed',
      CANCELLED: 'Cancelled',
    };
    return map[status] || status;
  }

  updateStatus(id: string, newStatus: string) {
    this.bookingService.updateBookingStatus(id, newStatus).subscribe({
      next: () => {
        const booking = this.bookings.find((b) => b.id === id);
        if (booking) booking.status = newStatus as any;
      },
      error: (err) => console.error('Failed to update status:', err),
    });
  }

  cancelBooking(id: string) {
    this.bookingService.cancelBooking(id).subscribe({
      next: () => {
        const booking = this.bookings.find((b) => b.id === id);
        if (booking) booking.status = 'CANCELLED';
      },
      error: (err) => console.error('Failed to cancel booking:', err),
    });
  }
}
