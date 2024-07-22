import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });
  user: any = null;

  constructor(private http: HttpClient) {
    this.checkLoginStatus();
  }

  registerApplication() {
    if (
      this.registerForm.value.password !==
      this.registerForm.value.confirmPassword
    ) {
      console.error('Passwords do not match');
      return;
    }

    const registerData = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };

    this.http
      .post('http://localhost:8000/users/register', registerData)
      .subscribe(
        (response: any) => {
          console.log('Registration successful', response);
          this.setCookie('token', response.token, 1);
          this.setCookie('userEmail', response.email, 1);
          this.user = { email: response.email };
        },
        (error) => {
          console.error('Registration failed', error);
        }
      );
  }

  logout() {
    this.deleteCookie('token');
    this.deleteCookie('userEmail');
    this.user = null;
  }

  private setCookie(name: string, value: string, hours: number) {
    let expires = '';
    if (hours) {
      const date = new Date();
      date.setTime(date.getTime() + hours * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  }

  private getCookie(name: string): string | null {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  private deleteCookie(name: string) {
    document.cookie =
      name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  private checkLoginStatus() {
    const token = this.getCookie('token');
    const userEmail = this.getCookie('userEmail');
    if (token && userEmail) {
      this.user = { email: userEmail };
    }
  }
}
