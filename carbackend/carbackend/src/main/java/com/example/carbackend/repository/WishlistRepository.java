package com.example.carbackend.repository;

import com.example.carbackend.model.Wishlist;
import com.example.carbackend.model.User;
import com.example.carbackend.model.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
    List<Wishlist> findByUser(User user);
    Optional<Wishlist> findByUserAndCar(User user, Car car);
    void deleteByUserAndCar(User user, Car car);
}
