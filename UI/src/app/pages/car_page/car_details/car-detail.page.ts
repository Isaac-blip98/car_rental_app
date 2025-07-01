import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VehicleService } from '../../../services/vehicle.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-car-detail',
  templateUrl: './car-detail.page.html',
  imports: [CommonModule, RouterModule, FormsModule],
})
export class CarDetailPage implements OnInit {
  successMessage = '';
  carId = '';
  car: any = {
    features: [],
  };
  pickupDate = '';
  returnDate = '';
  isBooking = false;

  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.carId = this.route.snapshot.paramMap.get('id') || '';
    if (this.carId) {
      this.vehicleService.getVehicleById(this.carId).subscribe((res) => {
        this.car = res;
      });
    }
  }

  bookNow() {
    const user = this.authService.getCurrentUser();
    const userId = user?.id || user?.userId;

    if (!userId) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: this.router.url },
      });
      return;
    }

    if (!this.pickupDate || !this.returnDate) {
      alert('Please select both pickup and return dates.');
      return;
    }

    if (new Date(this.pickupDate) >= new Date(this.returnDate)) {
      alert('Return date must be after pickup date.');
      return;
    }

    const booking = {
      vehicleId: this.carId,
      startDate: this.pickupDate,
      endDate: this.returnDate,
      isInstant: true,
    };

    this.isBooking = true;
    this.vehicleService.bookCar(booking).subscribe({
      next: () => {
        this.successMessage = '🎉 Booking successful! Redirecting to My Bookings...';
        setTimeout(() => {
          this.router.navigate(['/mybookings']);
        }, 2000);
        this.isBooking = false;
      },
      error: (err) => {
        console.error('Booking failed', err);
        const message =
          err?.error?.message || 'Booking failed. Please try again later.';
        alert(message);
        this.isBooking = false;
      },
    });
  }

  calculateTotalPrice(): number {
    const start = new Date(this.pickupDate);
    const end = new Date(this.returnDate);
    const days = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);
    return days > 0 ? days * this.car.dailyRate : 0;
  }
}
