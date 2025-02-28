import { Component } from '@angular/core';
import { LeaveService } from '../services/leave.service';
import { Leave } from '../models/leave';

@Component({
  selector: 'app-leaveform',
  templateUrl: './leaveform.component.html',
  styleUrls: ['./leaveform.component.css']
})
export class LeaveformComponent {
  pinNumber: string = ''; // Ensure user enters their PIN
  leave: Leave = {
    pinNumber: '',
    startDate: '',
    endDate: '',
    reason: '',
    status: 'PENDING'
  };

  constructor(private leaveService: LeaveService) {}

  applyLeave() {
    if (!this.pinNumber) {
      alert('Enter your PIN number!');
      return;
    }
    
    this.leave.pinNumber = this.pinNumber; // Assign PIN before sending
    this.leaveService.applyLeave(this.leave).subscribe({
      next: () => {
        alert('Leave Applied Successfully!');
        this.resetForm();
      },
      error: (err) => console.error('Error Applying Leave:', err),
    });
  }

  resetForm() {
    this.leave.startDate = '';
    this.leave.endDate = '';
    this.leave.reason = '';
  }
}
