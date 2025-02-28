import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isStudentLogin: boolean = true;
  user = { pinNumber: '', password: '', role: '' };

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  login() {
    // Set role based on selected radio button
    this.user.role = this.isStudentLogin ? 'STUDENT' : 'ADMIN';

    // **Check if credentials match the selected role**
    if (
      (this.user.role === 'STUDENT' && this.user.pinNumber.startsWith('admin')) ||
      (this.user.role === 'ADMIN' && !this.user.pinNumber.startsWith('admin'))
    ) {
      alert('Invalid credentials for the selected role.');
      return;
    }

    console.log('Attempting login with:', this.user); // Debug request

    this.authService.login(this.user).subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        const currentUser = this.authService.getCurrentUser();
        console.log('Logged in user:', currentUser); // Debug response

        if (currentUser?.role === 'STUDENT') {
          this.router.navigate(['/student-dashboard']);
        } else if (currentUser?.role === 'ADMIN') {
          this.router.navigate(['/admin-dashboard']);
        } else {
          alert('Unknown role. Contact Admin.');
        }
      } else {
        alert('Invalid credentials. Please try again.');
      }
    });
  }
}
