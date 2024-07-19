import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {
  reviews: any[] = [];

  constructor(private reviewService: ReviewService) {}

  ngOnInit() {
    this.reviewService.getReviews().subscribe(reviews => {
      this.reviews = reviews;
    });
  }
}
