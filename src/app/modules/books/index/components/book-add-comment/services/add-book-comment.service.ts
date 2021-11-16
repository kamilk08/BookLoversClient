import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PageService } from 'src/app/modules/shared/common/page.service';

@Injectable()
export class AddBookCommentService extends PageService {

  public addRatingForm: FormGroup
  public addReviewForm: FormGroup

  get review() {
    return this.addReviewForm.get('review').value;
  }

  get spoilerComment() {
    return this.addReviewForm.get('spoilerComment').value;
  }

  get rating() {
    return this.addRatingForm.get('stars').value;
  }

  constructor() {
    super();
    this.createAddRatingForm();
    this.createAddReviewForm();
  }

  private createAddRatingForm() {
    this.addRatingForm = new FormGroup({
      stars: new FormControl(null, [])
    });
  }

  private createAddReviewForm() {
    this.addReviewForm = new FormGroup({
      review: new FormControl(undefined, []),
      spoilerComment: new FormControl()
    })
  }

}
