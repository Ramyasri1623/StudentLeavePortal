package com.example.demo.services;

import com.example.demo.models.Leave;
import com.example.demo.models.User;
import com.example.demo.repository.LeaveRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LeaveService {
    private final LeaveRepository leaveRepository;
    private final UserRepository userRepository;

    public LeaveService(LeaveRepository leaveRepository, UserRepository userRepository) {
        this.leaveRepository = leaveRepository;
        this.userRepository = userRepository;
    }

    // Apply Leave for Student
    public Leave applyLeave(String pinNumber, Leave leave) {
        User user = userRepository.findById(pinNumber)
                .orElseThrow(() -> new RuntimeException("User not found"));
        leave.setUser(user);
        leave.setStatus("PENDING"); // Ensure "PENDING" status by default
        return leaveRepository.save(leave);
    }

    // Get Leave Requests by User (For Students to view their requests)
    public List<Leave> getLeavesByUser(String pinNumber) {
        return leaveRepository.findByUser_PinNumber(pinNumber);
    }

    // Admin: Approve or Reject Leave
    public Leave updateLeaveStatus(Long leaveId, String status) {
        Leave leave = leaveRepository.findById(leaveId)
                .orElseThrow(() -> new RuntimeException("Leave not found"));
        leave.setStatus(status.toUpperCase());
        return leaveRepository.save(leave);
    }

    // Admin: Get All Leave Requests
    public List<Leave> getAllLeaves() {
        return leaveRepository.findAll();
    }
}
