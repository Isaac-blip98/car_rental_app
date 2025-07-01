import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Booking } from '../interfaces/booking.interface';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getMyBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/bookings`);
  }

  createBooking(data: {
    vehicleId: string;
    startDate: string;
    endDate: string;
    isInstant: boolean;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/bookings`, data);
  }

  getBookingById(bookingId: string): Observable<Booking> {
    return this.http.get<Booking>(`${this.apiUrl}/bookings/${bookingId}`);
  }
  cancelBooking(bookingId: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/bookings/${bookingId}/cancel`, {});
  }

  updateBookingStatus(bookingId: string, status: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/bookings/${bookingId}/status`, {
      status,
    });
  }

  updateBooking(
    bookingId: string,
    data: {
      startDate?: string;
      endDate?: string;
      pickupLocation?: string;
    }
  ): Observable<any> {
    return this.http.patch(`${this.apiUrl}/bookings/${bookingId}`, data);
  }

  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/bookings/all`);
  }

  deleteBooking(bookingId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/bookings/${bookingId}`);
  }
}
