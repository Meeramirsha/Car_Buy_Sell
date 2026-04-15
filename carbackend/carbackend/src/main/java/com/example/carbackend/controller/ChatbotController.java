package com.example.carbackend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/chatbot")
@CrossOrigin(origins = "*")
public class ChatbotController {

    @PostMapping
    public ResponseEntity<Map<String, String>> getChatbotResponse(@RequestBody Map<String, String> request) {
        String userMessage = request.get("message").toLowerCase();
        String botResponse;

        if (userMessage.contains("under 10 lakh")) {
            botResponse = "For under 10 lakh, I recommend the Hyundai i20 or Maruti Swift. They offer great value and features!";
        } else if (userMessage.contains("suv for family") || userMessage.contains("large family")) {
            botResponse = "For a large family, the Toyota Innova or Mahindra XUV700 are excellent SUVs with 7-seater options.";
        } else if (userMessage.contains("mileage")) {
            botResponse = "Maruti Suzuki cars generally offer the best mileage. Specifically, the WagonR and Baleno are very fuel-efficient.";
        } else if (userMessage.contains("luxury")) {
            botResponse = "If you're looking for luxury, check out our BMW and Audi listings in the 'Cars' section.";
        } else if (userMessage.contains("hello") || userMessage.contains("hi")) {
            botResponse = "Hello! I'm your SmartCar assistant. How can I help you find your dream car today?";
        } else {
            botResponse = "That's a great question! While I'm still learning, I recommend checking our 'Recommendations' section for personalized picks based on your budget.";
        }

        Map<String, String> response = new HashMap<>();
        response.put("response", botResponse);
        return ResponseEntity.ok(response);
    }
}
