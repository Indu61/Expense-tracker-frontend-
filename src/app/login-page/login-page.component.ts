import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;
  invalidCredentials: boolean = false;

  apiUrl = environment.API_URL;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    console.log('Remember Me:', this.rememberMe);

    const loginData = {
      username: this.username,
      password: this.password,
    };

    this.http
      .post(`${this.apiUrl}/login`, loginData, { responseType: 'text' })
      .subscribe(
        (response) => {
          console.log('Login Successful:', response);
          //alert(response); // Display response message
          localStorage.setItem('authToken', response); // Store token
          this.router.navigate(['/expense-list']);
        },
        (error) => {
          console.error('Login Failed:', error);
          //alert('Invalid credentials');
          this.invalidCredentials = true;
        }
      );
  }

  navigateToRegister(event: Event) {
    event.preventDefault(); // Prevent default anchor behavior
    this.router.navigate(['/register']);
  }
}
