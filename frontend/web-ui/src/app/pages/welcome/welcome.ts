import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  template: `<h1>Welcome {{ user }}</h1>`
})
export class WelcomeComponent {
  user = '';

  constructor(route: ActivatedRoute) {
    route.queryParams.subscribe(p => this.user = p['user']);
  }
}