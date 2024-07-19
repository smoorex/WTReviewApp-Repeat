import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'http://localhost:5000/api/reviews';

  constructor(private http: HttpClient) {}

  getReviews(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addReview(reviewData: any): Observable<any> {
    return this.http.post(this.apiUrl, reviewData);
  }

  updateReview(reviewId: string, reviewData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${reviewId}`, reviewData);
  }

  deleteReview(reviewId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${reviewId}`);
  }
}
