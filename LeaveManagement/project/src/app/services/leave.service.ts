import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Leave } from '../models/leave';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  private apiUrl = 'http://localhost:8092/api/leaves';

  constructor(private http: HttpClient) {}

  // Apply for leave (User Use Case)
  applyLeave(leave: Leave): Observable<Leave> {
    return this.http.post<Leave>(`${this.apiUrl}/apply/${leave.pinNumber}`, leave);
  }

  // Get all leave requests (Admin Use Case)
  getLeaves(): Observable<Leave[]> {
    return this.http.get<Leave[]>(`${this.apiUrl}/getall`);
  }

  // Update Leave Status (Approve/Reject)
  updateLeave(leaveId: number, status: string): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(
      `${this.apiUrl}/update/${leaveId}/${status}`, // API should match backend
      {}
    );
  }
  getUserLeaves(pinNumber: string): Observable<Leave[]> {
    return this.http.get<Leave[]>(`${this.apiUrl}/getbyuser/${pinNumber}`);
  }
  
  
}
