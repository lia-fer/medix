import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Patient } from '../models/patient';

@Injectable({
    providedIn: 'root'
})
export class PatientService {
    private patients: Patient[] = [];
    private patientsSubject = new BehaviorSubject<Patient[]>([]);
    
    constructor() {
        // Load patients from localStorage
        const savedPatients = localStorage.getItem('patients');
        if (savedPatients) {
            this.patients = JSON.parse(savedPatients);
            this.patientsSubject.next(this.patients);
        }
    }

    getPatients(): Observable<Patient[]> {
        return this.patientsSubject.asObservable();
    }

    addPatient(patient: Omit<Patient, 'id'>): boolean {
        if (this.patients.length >= 10) {
            return false;
        }
        
        const newPatient = {
            ...patient,
            id: this.generateId()
        };
        
        this.patients.push(newPatient);
        this.updateLocalStorage();
        return true;
    }

    updatePatient(patient: Patient): void {
        const index = this.patients.findIndex(p => p.id === patient.id);
        if (index !== -1) {
            this.patients[index] = patient;
            this.updateLocalStorage();
        }
    }

    removePatient(id: number): void {
        this.patients = this.patients.filter(p => p.id !== id);
        this.updateLocalStorage();
    }

    private generateId(): number {
        return Math.max(0, ...this.patients.map(p => p.id)) + 1;
    }

    private updateLocalStorage(): void {
        localStorage.setItem('patients', JSON.stringify(this.patients));
        this.patientsSubject.next(this.patients);
    }
}