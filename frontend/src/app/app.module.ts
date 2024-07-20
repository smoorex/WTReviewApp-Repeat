import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // Correct way to provide HttpClient

import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ReviewListComponent } from './components/review-list/review-list.component';
import { AddReviewComponent } from './components/add-review/add-review.component';
import { AppRoutingModule } from './app-routing.module';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reviews', component: ReviewListComponent },
  { path: 'add-review', component: AddReviewComponent },
  { path: '', redirectTo: '/reviews', pathMatch: 'full' },
  { path: '**', redirectTo: '/reviews' }
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ReviewListComponent,
    AddReviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AppRoutingModule
  ],
  providers: [
    provideHttpClient() // Correctly provide HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
