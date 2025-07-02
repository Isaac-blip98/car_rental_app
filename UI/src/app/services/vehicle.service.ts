import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class VehicleService {
  private baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  getVehicles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/vehicles`);
  }

  getVehicleById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/vehicles/${id}`);
  }

  deleteVehicle(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  toggleAvailability(id: string, isAvailable: boolean): Observable<any> {
    return this.http.patch(`${this.baseUrl}/vehicles/${id}/availability`, {
      isAvailable,
    });
  }

  bookCar(data: {
    vehicleId: string;
    startDate: string;
    endDate: string;
    isInstant?: boolean;
  }) {
    return this.http.post(`${this.baseUrl}/bookings`, data);
  }

  createFeature(dto: { name: string }) {
    return this.http.post(`${environment.apiBaseUrl}/vehicles/feature`, dto);
  }

  getFeatures() {
    return this.http.get(`${environment.apiBaseUrl}/vehicles/feature`);
  }
}
