package com.example.carbackend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "payments")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id", nullable = false)
    private Booking booking;

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    private String paymentStatus; // e.g. CREATED, COMPLETED, FAILED

    @Column(nullable = true)
    private String transactionId;

    @Column(nullable = true)
    private String rzpOrderId; // To store the Razorpay Order ID before payment

    @Column(nullable = true)
    private String rzpPaymentId; // To store the Razorpay Payment ID after successful payment
    
    @Column(nullable = true)
    private String rzpSignature;

    @Column(nullable = false)
    private LocalDateTime paymentDate;
}
