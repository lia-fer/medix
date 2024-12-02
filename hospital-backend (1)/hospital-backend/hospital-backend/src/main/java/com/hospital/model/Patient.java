package com.hospital.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "patients")
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String fullName;
    
    private String birthDate;
    
    private String contactNumber;
    
    private String email;
    
    private String address;
    
    @Column(length = 1000)
    private String medicalHistory;
    
    private String lastVisit;
}