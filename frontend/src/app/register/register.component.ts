import {
  Component,
  Inject,
  Injectable,
  PLATFORM_ID,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
@Injectable({
  providedIn: 'root',
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });
  user: any = null;

  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkLoginStatus();
    }
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
      .post(
        'https://wtreviewapp-repeat.onrender.com/users/register',
        registerData
      )
      .subscribe(
        (response: any) => {
          console.log('Registration successful', response);
          if (isPlatformBrowser(this.platformId)) {
            this.setCookie('token', response.token, 1);
            this.setCookie('userEmail', response.email, 1);
          }
          this.user = { email: response.email };
        },
        (error) => {
          console.error('Registration failed', error);
        }
      );
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      this.deleteCookie('token');
      this.deleteCookie('userEmail');
    }
    this.user = null;
  }

  private setCookie(name: string, value: string, hours: number) {
    if (isPlatformBrowser(this.platformId)) {
      let expires = '';
      if (hours) {
        const date = new Date();
        date.setTime(date.getTime() + hours * 60 * 60 * 1000);
        expires = '; expires=' + date.toUTCString();
      }
      this.document.cookie = name + '=' + (value || '') + expires + '; path=/';
    }
  }

  private getCookie(name: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const nameEQ = name + '=';
      const ca = this.document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  }

  private deleteCookie(name: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.document.cookie =
        name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
  }

  private checkLoginStatus() {
    const token = this.getCookie('token');
    const userEmail = this.getCookie('userEmail');
    if (token && userEmail) {
      this.user = { email: userEmail };
    }
  }
}
