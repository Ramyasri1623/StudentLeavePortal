import { Component } from '@angular/core';
import { LeaveService } from '../services/leave.service';
import { AuthenticationService } from '../services/authentication.service';
import { Leave } from '../models/leave';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent {
  leave: Leave = {
    pinNumber: '',
    startDate: '',
    endDate: '',
    reason: '',
    status: 'PENDING'
  };

  leaves: Leave[] = []; // Store fetched leave requests

  constructor(
    private leaveService: LeaveService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.pinNumber) {
      this.leave.pinNumber = currentUser.pinNumber;
      this.getUserLeaves(); // Fetch user leaves on page load
    }
  }

  applyLeave() {
    if (this.leave.startDate && this.leave.endDate && this.leave.reason) {
      this.leaveService.applyLeave(this.leave).subscribe(
        (response) => {
          alert('Leave request submitted successfully!');
          this.getUserLeaves(); // Refresh leave requests after submission
          this.resetForm();
        },
        (error) => {
          console.error('Error submitting leave:', error);
          alert('Error occurred while submitting the leave request.');
        }
      );
    }
  }

  getUserLeaves() {
    const pinNumber = this.leave.pinNumber || ''; // Ensure it's always a string
    this.leaveService.getUserLeaves(pinNumber).subscribe(
      (data) => {
        this.leaves = data; // Assign fetched leave requests
      },
      (error) => {
        console.error('Error fetching leaves:', error);
      }
    );
  }
  

  private resetForm() {
    this.leave = {
      pinNumber: this.leave.pinNumber, // Retain pinNumber after reset
      startDate: '',
      endDate: '',
      reason: '',
      status: 'PENDING'
    };
  }
}
