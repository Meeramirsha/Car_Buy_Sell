package com.example.carbackend.controller;
// Force deploy comment to sync Render

import com.example.carbackend.model.SellRequest;
import com.example.carbackend.repository.SellRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/sellcar")
@CrossOrigin(origins = "*")
@SuppressWarnings("all")
public class SellRequestController {

    private final SellRequestRepository sellRequestRepository;

    @Autowired
    public SellRequestController(SellRequestRepository sellRequestRepository) {
        this.sellRequestRepository = sellRequestRepository;
    }

    @PostMapping
    public ResponseEntity<SellRequest> createSellRequest(@RequestBody SellRequest sellRequest) {
        if (sellRequest.getStatus() == null) sellRequest.setStatus("PENDING");
        SellRequest savedRequest = sellRequestRepository.save(sellRequest);
        return new ResponseEntity<>(savedRequest, HttpStatus.CREATED);
    }

    @PostMapping("/predict")
    public ResponseEntity<?> predictPrice(@RequestBody Map<String, Object> carDetails) {
        String aiServiceUrl = "https://car-buy-sell-1.onrender.com/predict-price";
        
        System.out.println("--- AI Price Prediction Request ---");
        System.out.println("Calling URL: " + aiServiceUrl);
        System.out.println("Request data: " + carDetails);

        // Configure timeout (60 seconds) to handle AI Service cold starts on Render
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(60000);
        factory.setReadTimeout(60000);
        
        RestTemplate restTemplate = new RestTemplate(factory);
        try {
            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                aiServiceUrl,
                HttpMethod.POST,
                new HttpEntity<>(carDetails),
                new ParameterizedTypeReference<Map<String, Object>>() {}
            );
            
            System.out.println("AI Service Response Status: " + response.getStatusCode());
            System.out.println("AI Service Response Body: " + response.getBody());
            
            return ResponseEntity.ok(response.getBody());
        } catch (Exception e) {
            System.err.println("CRITICAL: AI Service Communication Failed!");
            System.err.println("Target URL: " + aiServiceUrl);
            System.err.println("Error Type: " + e.getClass().getName());
            System.err.println("Error Message: " + e.getMessage());
            e.printStackTrace();

            // Fallback if AI service is down
            Map<String, Object> fallback = new HashMap<>();
            fallback.put("predicted_price", 0);
            fallback.put("error", "AI Service unavailable: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(fallback);
        }
    }

    @GetMapping
    public ResponseEntity<java.util.List<SellRequest>> getAllSellRequests() {
        return new ResponseEntity<>(sellRequestRepository.findAll(), HttpStatus.OK);
    }
}
