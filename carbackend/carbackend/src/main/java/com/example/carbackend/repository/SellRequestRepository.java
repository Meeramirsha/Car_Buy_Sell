package com.example.carbackend.repository;

import com.example.carbackend.model.SellRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SellRequestRepository extends JpaRepository<SellRequest, Long> {
}
