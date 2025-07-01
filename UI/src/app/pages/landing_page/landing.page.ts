import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VehicleService } from '../../services/vehicle.service';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../shared/services/auth-modal,service';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-landing',
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './landing.page.html',
})
export class LandingPage implements OnInit, OnDestroy {
  currentUser: any = null;
  userSub!: Subscription;

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
    private auth: AuthService,
    private route: ActivatedRoute,
    public authModal: ModalService
  ) {}

  ngOnInit() {
    this.userSub = this.auth.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    this.vehicleService.getVehicles().subscribe((res) => {
      this.featuredCars = res.slice(0, 3);
    });
  }

  ngOnDestroy() {
    this.userSub?.unsubscribe();
  }

  login() {
    const returnUrl =
      this.route.snapshot.queryParamMap.get('returnUrl') || '/home';

    this.auth
      .login(this.email, this.password)
      .then((user) => {
        setTimeout(() => {
          if (user.role === 'ADMIN') {
            this.router.navigate(['/dashboard']);
          } else if (user.role === 'AGENT') {
            this.router.navigate(['/agent/bookings']);
          } else {
            this.router.navigateByUrl(returnUrl);
          }
        }, 0);
      })
      .catch((err) => {
        this.errorMessage = err.message || 'Invalid credentials';
      });
  }

  isLoggedIn() {
    return !!this.currentUser;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/home']);
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
