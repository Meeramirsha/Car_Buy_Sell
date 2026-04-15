package com.example.carbackend.controller;

import com.example.carbackend.model.Payment;
import com.example.carbackend.service.PaymentService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create-order")
    public ResponseEntity<Payment> createOrder(@RequestBody PaymentRequest request) {
        try {
            Payment payment = paymentService.createOrder(
                    request.getBookingId(),
                    request.getAmount()
            );
            return ResponseEntity.ok(payment);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(@RequestBody VerifyPaymentRequest request) {
        try {
            Payment payment = paymentService.verifyPayment(
                    request.getBookingId(),
                    request.getRzpPaymentId(),
                    request.getRzpOrderId(),
                    request.getRzpSignature()
            );
            return ResponseEntity.ok(payment);
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }
}

@Data
class PaymentRequest {
    private Long bookingId;
    private Double amount;
}

@Data
class VerifyPaymentRequest {
    private Long bookingId;
    private String rzpPaymentId;
    private String rzpOrderId;
    private String rzpSignature;
}
