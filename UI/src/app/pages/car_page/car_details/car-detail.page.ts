import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VehicleService } from '../../../services/vehicle.service';


@Component({
  standalone: true,
  selector: 'app-car-detail',
  templateUrl: './car-detail.page.html',
  imports: [CommonModule, RouterModule],
})
export class CarDetailPage implements OnInit {
  carId = '';
  car: any = {
    features: []
  };

  constructor(private route: ActivatedRoute,   private vehicleService: VehicleService) {}

  ngOnInit() {
    const carId = this.route.snapshot.paramMap.get('id');
    if (carId) {
      this.vehicleService.getVehicleById(carId).subscribe((res) => {
        this.car = res;
      });
    }
  }
}
