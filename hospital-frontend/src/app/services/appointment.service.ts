import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Appointment } from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://localhost:8080/api/appointments';
  private appointments: Appointment[] = [];
  private appointmentsSubject = new BehaviorSubject<Appointment[]>([]);

  constructor(private http: HttpClient) {
    const savedAppointments = localStorage.getItem('appointments');
    if (savedAppointments) {
      this.appointments = JSON.parse(savedAppointments);
      this.appointmentsSubject.next(this.appointments);
    }
  }

  getAppointments(): Observable<Appointment[]> {
    return this.appointmentsSubject.asObservable();
  }

  addAppointment(appointment: Omit<Appointment, 'id'>): void {
    const newAppointment = {
      ...appointment,
      id: this.generateId()
    };
    
    this.appointments.push(newAppointment);
    this.updateLocalStorage();
  }

  updateAppointment(appointment: Appointment): void {
    const index = this.appointments.findIndex(a => a.id === appointment.id);
    if (index !== -1) {
      this.appointments[index] = appointment;
      this.updateLocalStorage();
    }
  }

  removeAppointment(id: number): void {
    this.appointments = this.appointments.filter(a => a.id !== id);
    this.updateLocalStorage();
  }

  private generateId(): number {
    return Math.max(0, ...this.appointments.map(a => a.id)) + 1;
  }

  private updateLocalStorage(): void {
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
    this.appointmentsSubject.next(this.appointments);
  }
}