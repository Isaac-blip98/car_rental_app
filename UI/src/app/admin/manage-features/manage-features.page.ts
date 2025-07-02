import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  standalone: true,
  selector: 'app-manage-features',
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-features.page.html',
})
export class ManageFeaturesPage implements OnInit {
  features: any[] = [];
  newFeature = '';
  errorMessage = '';
  successMessage = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadFeatures();
  }

  loadFeatures() {
    this.http.get(`${environment.apiBaseUrl}/vehicles/features`).subscribe({
      next: (data: any) => (this.features = data),
      error: () => (this.errorMessage = 'Failed to load features.'),
    });
  }

  addFeature() {
    if (!this.newFeature.trim()) return;

    this.http
      .post(`${environment.apiBaseUrl}/vehicles/features`, {
        name: this.newFeature,
      })
      .subscribe({
        next: () => {
          this.successMessage = 'Feature added!';
          this.newFeature = '';
          this.loadFeatures();
        },
        error: () => (this.errorMessage = 'Failed to add feature.'),
      });
  }
}
