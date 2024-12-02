import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Patient } from '../../models/patient';
import { PatientService } from '../../services/patient.service';

@Component({
    selector: 'app-patients',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './patients.component.html',
    styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
    patients: Patient[] = [];
    currentPatient: Partial<Patient> = {};
    isEditing: boolean = false;
    showForm: boolean = false;
    errorMessage: string = '';

    constructor(private patientService: PatientService) {}

    ngOnInit() {
        this.patientService.getPatients().subscribe(patients => {
            this.patients = patients;
        });
    }

    openAddForm() {
        if (this.patients.length >= 10) {
            this.errorMessage = 'Maximum limit of 10 patients reached';
            return;
        }
        this.currentPatient = {};
        this.isEditing = false;
        this.showForm = true;
    }

    openEditForm(patient: Patient) {
        this.currentPatient = {...patient};
        this.isEditing = true;
        this.showForm = true;
    }

    savePatient() {
        if (!this.validatePatient()) {
            return;
        }

        if (this.isEditing && 'id' in this.currentPatient) {
            this.patientService.updatePatient(this.currentPatient as Patient);
        } else {
            const success = this.patientService.addPatient(this.currentPatient as Omit<Patient, 'id'>);
            if (!success) {
                this.errorMessage = 'Maximum limit of 10 patients reached';
                return;
            }
        }

        this.showForm = false;
        this.currentPatient = {};
        this.errorMessage = '';
    }

    removePatient(id: number) {
        if (confirm('Are you sure you want to remove this patient?')) {
            this.patientService.removePatient(id);
        }
    }

    private validatePatient(): boolean {
        if (!this.currentPatient.fullName || !this.currentPatient.birthDate) {
            this.errorMessage = 'Name and birth date are required';
            return false;
        }
        return true;
    }
}