import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../../app/services/bookings.service';
import { AuthService } from '../../../app/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

interface Vehicle {
  id: string;
  name: string;
  category: string;
  transmission: string;
  fuelType: string;
  image: string;
}

interface Booking {
  id: string;
  vehicle: Vehicle;
  startDate: string;
  endDate: string;
  status: 'PENDING' | 'APPROVED' | 'CONFIRMED' | 'REJECTED' | 'CANCELLED';
  totalPrice?: number;
  bookingDate: string;
  pickupLocation?: string;
  imageError?: boolean;
}

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
})
export class MyBookingsComponent implements OnInit {
  bookings: Booking[] = [];
  loading = true;
  currentUser: any = null;

  constructor(
    private bookingService: BookingService,
    private authService: AuthService,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.fetchBookings();
  }

  fetchBookings() {
    this.loading = true;
    this.bookingService.getMyBookings().subscribe({
      next: (res) => {
        this.bookings = res.map(booking => ({
          ...booking,

          totalPrice: booking.totalPrice || 475,
          bookingDate: booking.bookingDate || booking.createdAt || new Date().toISOString(),
          pickupLocation: booking.pickupLocation || 'Airport Terminal 1'
        }));
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading bookings', err);
        this.loading = false;
      },
    });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  viewBookingDetails(bookingId: string) {
    this.router.navigate(['/booking-details', bookingId]);
  }

  cancelBooking(bookingId: string) {
    if (confirm('Are you sure you want to cancel this booking?')) {
      this.bookingService.cancelBooking(bookingId).subscribe({
        next: () => {
          this.fetchBookings(); 
        },
        error: (err) => {
          console.error('Error cancelling booking', err);
          alert('Failed to cancel booking. Please try again.');
        }
      });
    }
  }

  modifyBooking(bookingId: string) {
    this.router.navigate(['/modify-booking', bookingId]);
  }

  onImageError(event: any) {

    const img = event.target;
    const bookingIndex = this.bookings.findIndex(booking => 
      img.alt === booking.vehicle.name
    );
    if (bookingIndex !== -1) {
      this.bookings[bookingIndex].imageError = true;
    }
  }
}