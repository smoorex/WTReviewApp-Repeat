import { Routes } from '@angular/router';
import { ReviewListComponent,  } from './components/review-list/review-list.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AddReviewComponent } from './components/add-review/add-review.component';

export const routes: Routes = [
  { path: 'reviews', component: ReviewListComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'add-review', component: AddReviewComponent },
  { path: '', redirectTo: '/reviews', pathMatch: 'full' },
  { path: '**', redirectTo: '/reviews' } // Wildcard route for a 404 page
];
