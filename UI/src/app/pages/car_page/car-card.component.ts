import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IVehicle } from '../../interfaces/vehicle.interface';

@Component({
  standalone: true,
  selector: 'app-car-card',
  imports: [CommonModule],
  template: `
    <div class="border rounded-lg shadow p-4 space-y-2 hover:shadow-lg transition">
      <img [src]="car.imageUrls[0]" alt="Car Image" class="w-full h-40 object-cover rounded" />
      <h3 class="text-xl font-semibold">{{ car.title }}</h3>
      <p class="text-gray-600">{{ car.location }}</p>
      <p class="text-sm text-gray-500">{{ car.fuelType }} • {{ car.transmission }}</p>
      <p class="text-blue-600 font-bold">KES {{ car.dailyRate }}/day</p>
      <button class="mt-2 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition">
        View Details
      </button>
    </div>
  `
})
export class CarCardComponent {
  @Input() car!: IVehicle;
}
