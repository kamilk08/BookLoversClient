import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AddBookCommentService } from './services/add-book-comment.service';
import { ReviewPostChange } from './services/review-posted.event';

@Component({
  selector: 'book-add-comment',
  templateUrl: './add-book-comment.component.html',
  styleUrls: ['./add-book-comment.component.scss']
})
export class AddBookCommentComponent implements OnInit,OnDestroy {

  constructor(public pageService: AddBookCommentService) { }


  @Output() reviewPostChange: EventEmitter<ReviewPostChange> = new EventEmitter<ReviewPostChange>();

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.pageService.addRatingForm.reset();
    this.pageService.addReviewForm.reset();
  }

  clear() {
    this.pageService.addRatingForm.reset();
    this.pageService.addReviewForm.reset();
  }

  post() {
    this.reviewPostChange.emit({
      review: this.pageService.review,
      spoilerComment: this.pageService.spoilerComment,
      stars: this.pageService.rating
    });
  }
}
