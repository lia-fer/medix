package com.hospital.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "appointments")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Long patientId;
    
    private String patientName;
    
    private String date;
    
    private String time;
    
    @Enumerated(EnumType.STRING)
    private AppointmentStatus status;
    
    private String reason;
    
    @Column(length = 1000)
    private String notes;
    
    public enum AppointmentStatus {
        SCHEDULED, COMPLETED, CANCELLED
    }
}