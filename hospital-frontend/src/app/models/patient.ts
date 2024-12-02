export interface Patient {
    id: number;
    fullName: string;
    birthDate: string;
    contactNumber: string;
    email: string;
    address: string;
    medicalHistory?: string;
    lastVisit?: string;
}