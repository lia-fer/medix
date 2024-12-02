import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { PatientService } from '../../services/patient.service';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  patientCount: number = 0;
  todayAppointments: number = 0;
  pageTitle: string = 'Dashboard';
  
  // New stats
  completedAppointments: number = 0;
  pendingAppointments: number = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
    private patientService: PatientService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit() {
    // Load user data
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });

    // Get patient count
    this.patientService.getPatients().subscribe(patients => {
      this.patientCount = patients.length;
    });

    // Get appointment statistics
    const today = new Date().toISOString().split('T')[0];
    this.appointmentService.getAppointments().subscribe(appointments => {
      this.todayAppointments = appointments.filter(a => a.date === today).length;
      this.completedAppointments = appointments.filter(a => a.status === 'COMPLETED').length;
      this.pendingAppointments = appointments.filter(a => a.status === 'SCHEDULED').length;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Update page title based on route
  updatePageTitle(title: string) {
    this.pageTitle = title;
  }
}