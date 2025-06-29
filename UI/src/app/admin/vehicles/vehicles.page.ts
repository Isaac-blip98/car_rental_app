import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vehicles-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vehicles.page.html',
})
export class VehiclesPage {
  brand = '';
  model = '';
  year!: number;
  dailyRate!: number;
  category = '';
  fuelType = '';
  transmission = '';
  seatingCapacity!: number;
  location = '';
  description = '';
  imageUrls: string[] = [];

  categories: any[] = [];
  fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
  transmissions = ['Automatic', 'Manual'];

  uploading = false;
  uploadError = '';
  cloudName = 'YOUR_CLOUD_NAME';
  uploadPreset = 'YOUR_UPLOAD_PRESET';

  constructor(private http: HttpClient, private router: Router) {
    this.fetchCategories();
  }

  fetchCategories() {
    this.http.get<any[]>('/api/vehicle-categories').subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Failed to fetch categories:', err);
      },
    });
  }

  onImageSelected(event: any) {
    const files: FileList = event.target.files;
    if (!files.length) return;

    this.uploading = true;
    this.uploadError = '';
    this.imageUrls = [];

    Array.from(files).forEach((file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', this.uploadPreset);

      this.http
        .post(`https://api.cloudinary.com/v1_1/${this.cloudName}/upload`, formData)
        .subscribe({
          next: (res: any) => {
            this.imageUrls.push(res.secure_url);
            if (this.imageUrls.length === files.length) {
              this.uploading = false;
            }
          },
          error: () => {
            this.uploading = false;
            this.uploadError = 'Image upload failed.';
          },
        });
    });
  }

  submitVehicle() {
    const payload = {
      title: `${this.brand} ${this.model}`,
      brand: this.brand,
      model: this.model,
      year: this.year,
      dailyRate: this.dailyRate,
      category: this.category,
      transmission: this.transmission,
      fuelType: this.fuelType,
      seatingCapacity: this.seatingCapacity,
      location: this.location,
      description: this.description,
      imageUrls: this.imageUrls,
    };

    this.http.post('/api/vehicles', payload).subscribe(() => {
      alert('Vehicle listed successfully!');
      this.router.navigate(['/dashboard/categories']);
    });
  }
}
