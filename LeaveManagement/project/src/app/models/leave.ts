// models/leave.ts
export class Leave {
  id?: number; 
  pinNumber?: string; // Optional since it's created by the backend
   // Required to track the user applying
  startDate!: string; // Date input from user
  endDate!: string; // Date input from user
  reason!: string; // Reason for leave
  status!: 'PENDING' | 'APPROVED' | 'REJECTED'; // Leave status enum
}
