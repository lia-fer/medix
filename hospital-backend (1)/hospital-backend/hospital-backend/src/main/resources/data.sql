-- Users
MERGE INTO users KEY(username) 
VALUES ('doctor', '$2a$10$8jf7TG7DZEQo0jZ.6qEyVOmCQhwRxoALGdIXf.zA3YfdJIxHzpzhi', 'Dr. John Smith', 'DOCTOR', 0);

-- Patients
MERGE INTO patients KEY(id) 
VALUES 
(1, 'Alice Johnson', '1990-05-15', '555-0101', 'alice@email.com', '123 Main St', 'Allergies: Penicillin', '2024-03-15'),
(2, 'Bob Wilson', '1985-08-22', '555-0102', 'bob@email.com', '456 Oak Ave', 'Hypertension', '2024-03-10'),
(3, 'Carol Martinez', '1978-11-30', '555-0103', 'carol@email.com', '789 Pine St', 'Type 2 Diabetes', '2024-03-20');

-- Appointments
MERGE INTO appointments KEY(id) 
VALUES 
(1, 1, 'Alice Johnson', CURRENT_DATE(), '09:00', 'SCHEDULED', 'Annual Check-up', 'Regular health check'),
(2, 2, 'Bob Wilson', CURRENT_DATE(), '14:30', 'SCHEDULED', 'Follow-up', 'Blood pressure review'),
(3, 3, 'Carol Martinez', DATEADD('DAY', 1, CURRENT_DATE()), '10:00', 'SCHEDULED', 'Diabetes Check', 'Regular diabetes monitoring');