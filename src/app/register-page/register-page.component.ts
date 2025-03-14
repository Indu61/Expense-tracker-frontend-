import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  apiUrl = environment.API_URL;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    console.log('username ' + this.username);
    console.log('email ' + this.email);
    console.log('password ' + this.password);

    const registerData = {
      username: this.username,
      email: this.email,
      password: this.password,
    };

    this.http
      .post(`${this.apiUrl}/register`, registerData, { responseType: 'text' })
      .subscribe(
        (response) => {
          console.log('register Successful:', response);
          //alert(response);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Login Failed:', error);
          alert('Invalid credentials');
        }
      );
  }
}
