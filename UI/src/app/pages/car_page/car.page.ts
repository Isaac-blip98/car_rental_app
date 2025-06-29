import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  standalone: true,
  selector: 'app-cars',
  templateUrl: './cars.page.html',
  imports: [CommonModule, RouterModule],
})
export class CarsPage implements OnInit {
  cars: any[] = [];
  location = '';
  pickupDate = '';
  returnDate = '';

  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehicleService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.location = params['location'];
      this.pickupDate = params['pickupDate'];
      this.returnDate = params['returnDate'];
    });

    this.fetchCars();
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
}
