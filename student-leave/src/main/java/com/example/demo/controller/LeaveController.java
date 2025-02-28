package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.models.Leave;
import com.example.demo.services.LeaveService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/leaves")
@CrossOrigin(origins = "http://localhost:4200")
public class LeaveController {

    @Autowired
    private LeaveService leaveService;

    @PostMapping("/apply/{pinNumber}")
    public Leave applyLeave(@PathVariable String pinNumber, @RequestBody Leave leave) {
        return leaveService.applyLeave(pinNumber, leave);
    }

    @GetMapping("/getall")
    public List<Leave> getAllLeaves() {
        return leaveService.getAllLeaves();
    }

    @GetMapping("/getbyuser/{pinNumber}")
    public List<Leave> getLeavesByUser(@PathVariable String pinNumber) {
        return leaveService.getLeavesByUser(pinNumber);
    }

    
    @PutMapping("/update/{leaveId}/{status}")
    public Leave updateLeaveStatus(@PathVariable Long leaveId, @PathVariable String status) {
        return leaveService.updateLeaveStatus(leaveId, status);
    }

    
}
