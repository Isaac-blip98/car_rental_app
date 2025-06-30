import { Routes } from '@angular/router';
import { LandingPage } from './pages/landing_page/landing.page';
import { CarsPage } from './pages/car_page/car.page';
import { CarDetailPage } from './pages/car_page/car_details/car-detail.page';
import { LoginPage } from './auth/Login/login.page';
import { AdminDashboardPage } from './admin/dashboard/dashboard.page';
import { AuthGuard } from '../guards/auth.guards';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: LandingPage },
  { path: 'cars', component: CarsPage },
  { path: 'cars/:id', component: CarDetailPage },
  { path: 'login', component: LoginPage },
  {
    path: 'register',
    loadComponent: () =>
      import('./auth/register/register.page').then((m) => m.RegisterPage),
  },

  {
    path: 'dashboard',
    canActivate: [AuthGuard], 
    data: { roles: ['ADMIN', 'AGENT'] }, 
    component: AdminDashboardPage,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./admin/overview/admin-overview.component').then(
            (m) => m.AdminOverviewComponent
          ),
      },

      {
        path: 'vehicles',
        loadComponent: () =>
          import('./admin/vehicles/vehicles.page').then((m) => m.VehiclesPage),
      },

      {
        path: 'manage-cars',
        loadComponent: () =>
          import('./admin/manage-cars/manage-cars.component').then(
            (m) => m.ManageCarsComponent
          ),
      },
    ],
  },
];
