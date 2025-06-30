import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../interfaces/vehicle.interface';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-manage-cars',
  standalone: true,
  templateUrl: './manage-cars.component.html',
})
export class ManageCarsComponent implements OnInit {
  vehicles: Vehicle[] = [];

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.vehicleService.getVehicles().subscribe({
      next: (data: Vehicle[]) => (this.vehicles = data),
      error: (err: string) => console.error(err),
    });
  }

  deleteVehicle(id: string) {
    if (confirm('Are you sure you want to delete this vehicle?')) {
      this.vehicleService.deleteVehicle(id).subscribe({
        next: () => {
          this.vehicles = this.vehicles.filter((v) => v.id !== id);
        },
        error: (err) => console.error('Failed to delete vehicle', err),
      });
    }
  }

  toggleAvailability(vehicle: Vehicle) {
    const newStatus = !vehicle.isAvailable;

    this.vehicleService.toggleAvailability(vehicle.id, newStatus).subscribe({
      next: () => {
        vehicle.isAvailable = newStatus;
      },
      error: (err) => console.error('Failed to toggle availability', err),
    });
  }
}
