import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };

  constructor(private userService: UserService, private router: Router) {}

  login() {
    this.userService.loginUser(this.user).subscribe(
      response => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/reviews']);
      },
      error => {
        console.error('Error logging in', error);
      }
    );
  }
}
