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

  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private router: Router,
    private authService: AuthService
  ) {}

bookNow() {
  const user = this.authService.getCurrentUser();

  if (!user?.id) {
    this.router.navigate(['/login'], {
      queryParams: { returnUrl: this.router.url },
    });
    return;
  }

  if (!this.pickupDate || !this.returnDate) {
    alert('Please select both pickup and return dates.');
    return;
  }

  const booking = {
    vehicleId: this.car.id,
    startDate: this.pickupDate,
    endDate: this.returnDate,
    isInstant: true,
  };

  this.vehicleService.bookCar(booking).subscribe({
    next: () => {
      this.successMessage = '🎉 Booking successful! Redirecting to My Bookings...';
      setTimeout(() => {
        this.router.navigate(['/mybookings']);
      }, 2000);
    },
    error: (err) => {
      console.error('Booking failed', err);
      alert('Booking failed. Please try again later.');
    },
  });
}


  calculateTotalPrice(): number {
    const start = new Date(this.pickupDate);
    const end = new Date(this.returnDate);
    const days = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);
    return days * this.car.dailyRate;
  }

  ngOnInit() {
    const carId = this.route.snapshot.paramMap.get('id');
    if (carId) {
      this.vehicleService.getVehicleById(carId).subscribe((res) => {
        this.car = res;
      });
    }
  }
}
