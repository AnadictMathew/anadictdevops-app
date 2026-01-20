import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  username = '';

  constructor(private router: Router) {}

  login() {
    if (this.username) {
      this.router.navigate(['/welcome'], {
        queryParams: { user: this.username }
      });
    }
  }
}