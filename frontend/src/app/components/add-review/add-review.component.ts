import { Component } from '@angular/core';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent {
  review = {
    title: '',
    author: '',
    rating: 0,
    content: ''
  };

  constructor(private reviewService: ReviewService) {}

  addReview() {
    this.reviewService.addReview(this.review).subscribe(response => {
      console.log('Review added:', response);
    });
  }
}
