package com.example.carbackend.service;

import com.example.carbackend.model.Booking;
import com.example.carbackend.model.Payment;
import com.example.carbackend.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;
import org.json.JSONObject;
@Service
@SuppressWarnings("all")
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private BookingService bookingService;

    @Value("${razorpay.key.id}")
    private String razorpayKeyId;

    @Value("${razorpay.key.secret}")
    private String razorpayKeySecret;

    public Payment createOrder(Long bookingId, Double amount) throws Exception {
        Booking booking = bookingService.getBookingById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        // Simulate Order ID Generation
        String simulatedOrderId = "order_sim_" + java.util.UUID.randomUUID().toString().substring(0, 8);

        Payment payment = Payment.builder()
                .booking(booking)
                .amount(amount)
                .paymentStatus("CREATED")
                .rzpOrderId(simulatedOrderId)
                .paymentDate(LocalDateTime.now())
                .build();

        return paymentRepository.save(payment);
    }

    public Payment verifyPayment(Long bookingId, String rzpPaymentId, String rzpOrderId, String rzpSignature) throws Exception {
        bookingService.getBookingById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        Payment payment = paymentRepository.findByBookingId(bookingId)
                .orElseThrow(() -> new RuntimeException("Payment record not found"));

        // Simulate Signature Verification Success
        payment.setPaymentStatus("SUCCESS");
        payment.setRzpPaymentId(rzpPaymentId);
        payment.setTransactionId(rzpPaymentId); 
        payment.setRzpSignature(rzpSignature);
        
        bookingService.updateBookingStatus(bookingId, "CONFIRMED");
        return paymentRepository.save(payment);
    }
}
