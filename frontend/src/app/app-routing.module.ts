import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ReviewListComponent } from './components/review-list/review-list.component';
import { AddReviewComponent } from './components/add-review/add-review.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reviews', component: ReviewListComponent },
  { path: 'add-review', component: AddReviewComponent },
  { path: '', redirectTo: '/reviews', pathMatch: 'full' },
  { path: '**', redirectTo: '/reviews' } // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
