import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { FavouritesComponent } from './favourites/favourites.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'Login Page' },
  {
    path: 'favourites',
    component: FavouritesComponent,
    title: 'Favourites Page',
  },
  { path: 'register', component: RegisterComponent, title: 'Register Page' },
  { path: 'home', component: HomeComponent, title: 'Home Page' },
];
