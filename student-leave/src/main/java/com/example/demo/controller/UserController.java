package com.example.demo.controller;

import com.example.demo.models.User;
import com.example.demo.repository.UserRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("http://localhost:4200") // Allow frontend access
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        System.out.println("🔹 Received Login Request");
        System.out.println("🔹 Entered PIN: " + user.getPinNumber());
        System.out.println("🔹 Entered Password: " + user.getPassword());

        Optional<User> foundUser = userRepository.findByPinNumber(user.getPinNumber());

        if (foundUser.isPresent()) {
            User existingUser = foundUser.get();
            System.out.println("✅ User Found: " + existingUser.getPinNumber());
            System.out.println("🛑 Stored Password: " + existingUser.getPassword());

            // Check if passwords match
            if (user.getPassword().equals(existingUser.getPassword())) {
                System.out.println("✅ Login Successful!");
                return ResponseEntity.ok(existingUser); // Send user details on success
            } else {
                System.out.println("❌ Password Mismatch!");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }
        } else {
            System.out.println("❌ User Not Found!");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

}
