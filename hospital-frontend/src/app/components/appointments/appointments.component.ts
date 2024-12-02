import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Appointment } from '../../models/appointment';
import { Patient } from '../../models/patient';
import { AppointmentService } from '../../services/appointment.service';
import { PatientService } from '../../services/patient.service';

@Component({
    selector: 'app-appointments',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './appointments.component.html',
    styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
    appointments: Appointment[] = [];
    patients: Patient[] = [];
    currentAppointment: Partial<Appointment> = {};
    showForm = false;
    errorMessage = '';
    currentDate = new Date();
    selectedDate: string = '';
    availableTimeSlots: string[] = this.generateTimeSlots();

    constructor(
        private appointmentService: AppointmentService,
        private patientService: PatientService
    ) {}

    ngOnInit() {
        this.appointmentService.getAppointments().subscribe(appointments => {
            this.appointments = appointments;
        });

        this.patientService.getPatients().subscribe(patients => {
            this.patients = patients;
        });

        // Set default selected date to today
        this.selectedDate = this.formatDate(new Date());
    }
    
    editAppointment(appointment: Appointment) {
      this.currentAppointment = { ...appointment };
      this.showForm = true;
    }

    removeAppointment(id: number) {
      if (confirm('Are you sure you want to cancel this appointment?')) {
          this.appointmentService.removeAppointment(id);
      }
    }

    private formatDate(date: Date): string {
        return date.toISOString().split('T')[0];
    }

    private generateTimeSlots(): string[] {
        const slots = [];
        for (let hour = 9; hour <= 17; hour++) {
            slots.push(`${hour.toString().padStart(2, '0')}:00`);
            slots.push(`${hour.toString().padStart(2, '0')}:30`);
        }
        return slots;
    }

    getAppointmentsForDate(date: string): Appointment[] {
        return this.appointments.filter(a => a.date === date);
    }

    openAddForm() {
        if (this.patients.length === 0) {
            this.errorMessage = 'Please add patients before scheduling appointments';
            return;
        }
        this.currentAppointment = {
            date: this.selectedDate,
            status: 'SCHEDULED'
        };
        this.showForm = true;
    }

    saveAppointment() {
        if (!this.validateAppointment()) {
            return;
        }

        const patient = this.patients.find(p => p.id === Number(this.currentAppointment.patientId));
        if (!patient) {
            this.errorMessage = 'Patient not found';
            return;
        }

        this.currentAppointment.patientName = patient.fullName;

        if ('id' in this.currentAppointment) {
            this.appointmentService.updateAppointment(this.currentAppointment as Appointment);
        } else {
            this.appointmentService.addAppointment(this.currentAppointment as Omit<Appointment, 'id'>);
        }

        this.showForm = false;
        this.currentAppointment = {};
        this.errorMessage = '';
    }

    private validateAppointment(): boolean {
        if (!this.currentAppointment.patientId || !this.currentAppointment.date || !this.currentAppointment.time) {
            this.errorMessage = 'Please fill in all required fields';
            return false;
        }
        return true;
    }
}