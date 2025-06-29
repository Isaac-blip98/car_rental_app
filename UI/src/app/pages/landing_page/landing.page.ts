import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VehicleService } from '../../services/vehicle.service';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-landing',
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './landing.page.html',
})
export class LandingPage implements OnInit {
  showLogin = false;
  email = '';
  password = '';
  errorMessage = '';
  location = '';
  pickupDate = '';
  returnDate = '';
  locations: string[] = ['Nairobi', 'Mombasa', 'Kisumu', 'Eldoret'];
  featuredCars: any[] = [];

  constructor(
    private router: Router,
    private vehicleService: VehicleService,
    private auth: AuthService
  ) {}

  login() {
    this.auth
      .login(this.email, this.password)
      .then((user) => {
        this.showLogin = false;
        if (user.role === 'ADMIN') {
          this.router.navigate(['/dashboard']);
        } else if (user.role === 'AGENT') {
          this.router.navigate(['/agent/bookings']);
        } else {
          this.router.navigate(['/home']);
        }
      })
      .catch((err) => {
        this.errorMessage = err.message || 'Login failed';
      });
  }

  ngOnInit() {
    this.vehicleService.getVehicles().subscribe((res) => {
      this.featuredCars = res.slice(0, 3);
    });
  }

  search() {
    if (!this.location || !this.pickupDate || !this.returnDate) {
      alert('Please select location and dates.');
      return;
    }

    this.router.navigate(['/cars'], {
      queryParams: {
        location: this.location,
        pickupDate: this.pickupDate,
        returnDate: this.returnDate,
      },
    });
  }
}
