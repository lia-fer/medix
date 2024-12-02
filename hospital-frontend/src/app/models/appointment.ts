export interface Appointment {
    id: number;
    patientId: number;
    patientName: string;
    date: string;
    time: string;
    status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
    reason: string;
    notes?: string;
}