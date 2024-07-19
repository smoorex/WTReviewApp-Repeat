import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private userService: UserService) {}

  register() {
    this.userService.registerUser(this.user).subscribe(response => {
      console.log('User registered:', response);
    });
  }
}
