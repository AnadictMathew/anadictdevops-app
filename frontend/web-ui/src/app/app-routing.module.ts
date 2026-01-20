import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { WelcomeComponent } from './pages/welcome/welcome';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'welcome', component: WelcomeComponent }
];