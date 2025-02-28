export interface User {
  id?: number; // Make it optional
  pinNumber?: string; // For students only
  username?: string; // For admin only
  password: string;
  role: 'STUDENT' | 'ADMIN';
  }
  