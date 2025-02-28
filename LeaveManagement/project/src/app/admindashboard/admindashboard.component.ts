import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../services/leave.service';
import { Leave } from '../models/leave';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  leaves: Leave[] = [];

  constructor(private leaveService: LeaveService) {}

  ngOnInit() {
    this.getAllLeaves();
  }

  getAllLeaves() {
    this.leaveService.getLeaves().subscribe({
      next: (data) => this.leaves = data,
      error: (err) => console.error('Error fetching leaves:', err)
    });
  }

  updateLeaveStatus(leaveId: number, status: string) {
    this.leaveService.updateLeave(leaveId, status).subscribe({
      next: () => {
        alert(`Leave status updated to ${status}`);
        this.getAllLeaves(); // Refresh leave list
      },
      error: (err) => console.error('Error updating leave status:', err)
    });
  }
}
