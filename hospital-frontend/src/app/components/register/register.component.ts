import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { AuthService } from '../../services/auth.service';

interface User {
  username: string;
  password: string;
  fullName: string;
  role?: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule] 
})
export class RegisterComponent {
  user: User = {
    username: '',
    password: '',
    fullName: '',
    role: 'DOCTOR'
  };
  errorMessage: string = '';
  isLoading: boolean = false;
  showPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onRegister() {
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;
    this.authService.register(this.user).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.isLoading = false;
        this.handleRegistrationError(error);
      }
    });
  }

  private validateForm(): boolean {
    if (!this.user.username || !this.user.password || !this.user.fullName) {
      this.errorMessage = 'All fields are required.';
      return false;
    }
    if (this.user.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters long.';
      return false;
    }
    return true;
  }

  private handleRegistrationError(error: any) {
    if (error.status === 409) {
      this.errorMessage = 'Username already exists. Please choose another.';
    } else if (error.status === 400) {
      this.errorMessage = 'Invalid input. Please check your details.';
    } else {
      this.errorMessage = 'Registration failed. Please try again later.';
    }
  }
}