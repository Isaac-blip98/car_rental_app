import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { SystemStats } from '../../interfaces/system-stats.interface';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../shared/services/auth-modal,service';

@Component({
  standalone: true,
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.page.html',
  imports: [CommonModule, RouterModule],
})
export class AdminDashboardPage implements OnInit {
  currentUser: any = null;
  stats: SystemStats | null = null;
  loading = true;

  constructor(private adminService: AdminService, private auth: AuthService, private router: Router, public modalService: ModalService) {}

  ngOnInit() {
    this.currentUser = this.auth.getCurrentUser();

    if (
      !this.currentUser ||
      !['ADMIN', 'AGENT'].includes(this.currentUser.role)
    ) {
      this.router.navigate(['/login']);
      return;
    }

    this.adminService.getStats().subscribe({
      next: (data) => {
        this.stats = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to fetch stats:', err);
        this.loading = false;
      },
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/home']);
  }
}
