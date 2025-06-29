import { Routes } from '@angular/router';
import { LandingPage } from './pages/landing_page/landing.page';
import { CarsPage } from './pages/car_page/car.page';
import { CarDetailPage } from './pages/car_page/car_details/car-detail.page';
import { LoginPage } from './auth/Login/login.page';
import { AdminDashboardPage } from './admin/dashboard/dashboard.page';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: LandingPage },
  { path: 'cars', component: CarsPage },
  { path: 'cars/:id', component: CarDetailPage },
  { path: 'login', component: LoginPage },
  {
    path: 'dashboard',
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
      // {
      //       path: 'categories',
      //       loadComponent: () => import('./admin/categories/categories.page').then(m => m.CategoriesPage),
      //     },
      //     {
      //       path: 'bookings',
      //       loadComponent: () => import('./admin/bookings/bookings.page').then(m => m.BookingsPage),
      //     }
    ],
  },
];
