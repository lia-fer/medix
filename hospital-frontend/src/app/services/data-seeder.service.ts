import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { PatientService } from './patient.service';
import { AppointmentService } from './appointment.service';
import { Patient } from '../models/patient';
import { Appointment } from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class DataSeederService {
  constructor(
    private authService: AuthService,
    private patientService: PatientService,
    private appointmentService: AppointmentService
  ) {}

  seedData() {
    this.seedUsers();
    this.seedPatients();
    this.seedAppointments();
  }

  private seedUsers() {
    // Only seed if no users exist
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.length === 0) {
      this.authService.register({
        username: 'doctor',
        password: 'P@ssword123',
        fullName: 'John Smith'
      }).subscribe();
    }
  }

  private seedPatients() {
    // Only seed if no patients exist
    const patients = JSON.parse(localStorage.getItem('patients') || '[]');
    if (patients.length === 0) {
      const samplePatients: Omit<Patient, 'id'>[] = [
        {
          fullName: 'Alice Johnson',
          birthDate: '1990-05-15',
          contactNumber: '555-0101',
          email: 'alice@email.com',
          address: '123 Main St',
          medicalHistory: 'Allergies: Penicillin',
          lastVisit: '2024-03-15'
        },
        {
          fullName: 'Bob Wilson',
          birthDate: '1985-08-22',
          contactNumber: '555-0102',
          email: 'bob@email.com',
          address: '456 Oak Ave',
          medicalHistory: 'Hypertension',
          lastVisit: '2024-03-10'
        },
        {
          fullName: 'Carol Martinez',
          birthDate: '1978-11-30',
          contactNumber: '555-0103',
          email: 'carol@email.com',
          address: '789 Pine St',
          medicalHistory: 'Type 2 Diabetes',
          lastVisit: '2024-03-20'
        }
      ];

      samplePatients.forEach(patient => {
        this.patientService.addPatient(patient);
      });
    }
  }

  private seedAppointments() {
    // Only seed if no appointments exist
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    if (appointments.length === 0) {
      const today = new Date().toISOString().split('T')[0];
      const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
      
      const sampleAppointments: Omit<Appointment, 'id'>[] = [
        {
          patientId: 1,
          patientName: 'Alice Johnson',
          date: today,
          time: '09:00',
          status: 'SCHEDULED',
          reason: 'Annual Check-up',
          notes: 'Regular health check'
        },
        {
          patientId: 2,
          patientName: 'Bob Wilson',
          date: today,
          time: '14:30',
          status: 'SCHEDULED',
          reason: 'Follow-up',
          notes: 'Blood pressure review'
        },
        {
          patientId: 3,
          patientName: 'Carol Martinez',
          date: tomorrow,
          time: '10:00',
          status: 'SCHEDULED',
          reason: 'Diabetes Check',
          notes: 'Regular diabetes monitoring'
        }
      ];

      sampleAppointments.forEach(appointment => {
        this.appointmentService.addAppointment(appointment);
      });
    }
  }
}