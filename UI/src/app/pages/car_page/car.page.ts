import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VehicleService } from '../../services/vehicle.service';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-cars',
  templateUrl: './cars.page.html',
  imports: [CommonModule, RouterModule],
})
export class CarsPage implements OnInit {
  currentUser: any = null;
  cars: any[] = [];
  location = '';
  pickupDate = '';
  returnDate = '';

  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.currentUser = this.auth.getCurrentUser();
    this.route.queryParams.subscribe((params) => {
      this.location = params['location'];
      this.pickupDate = params['pickupDate'];
      this.returnDate = params['returnDate'];
    });

    this.fetchCars();
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  fetchCars() {
    this.vehicleService.getVehicles().subscribe((res) => {
      if (this.location) {
        this.cars = res.filter((car) =>
          car.location.toLowerCase().includes(this.location.toLowerCase())
        );
      } else {
        this.cars = res;
      }
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/home']);
  }
}
