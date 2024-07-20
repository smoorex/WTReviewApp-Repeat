import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [FormsModule]
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
