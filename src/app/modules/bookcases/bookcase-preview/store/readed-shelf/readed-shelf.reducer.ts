import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Action, createReducer, on } from "@ngrx/store";
import { updateFormValidity } from "src/app/modules/shared/common/update-form-validity";

import * as fromActions from '../readed-shelf/readed-shelf.actions';

export interface ReadedShelfState {
  ratingForm: FormGroup
  reviewForm: FormGroup,
}

const initialState: ReadedShelfState = {
  ratingForm: createRatingForm(),
  reviewForm: createReviewForm()
}

const reducer = createReducer(initialState,
  on(fromActions.SUBMIT_BOOKCASE_PREVIEW_FORM, (state) => {
    updateFormValidity(state.reviewForm)

    return { ...state, reviewForm: state.reviewForm }
  }),
  on(fromActions.UPDATE_REVIEW_FORM, (state, action) => {

    const review = action.payload.review;
    const form = state.reviewForm;

    form.get('oldReview').setValue(review);
    form.get('comment').setValue(review.reviewContent.reviewText);
    form.get('hasReview').setValue(true);
    form.get('spoilerComment').setValue(review.reviewContent.markedAsSpoiler);

    return { ...state, reviewForm: new FormGroup(form.controls) }
  }),
  on(fromActions.UPDATE_REVIEW_FORM_VALIDITY, (state) => {
    updateFormValidity(state.reviewForm);

    return { ...state, reviewForm: state.reviewForm }
  }),
  on(fromActions.SET_NO_REVIEW, (state) => {

    const form = state.reviewForm;

    form.get('hasReview').setValue(false);

    return { ...state, reviewForm: form }
  }),
  on(fromActions.UPDATE_RATING_FORM, (state, action) => {

    const ratingForm = state.ratingForm;
    const rating = action.payload.rating;

    ratingForm.get('oldGrade').setValue(rating);
    ratingForm.get('selectedGrade').setValue(rating.stars);

    return { ...state, ratingForm: ratingForm }
  }),
  on(fromActions.RESET_RATING_FORM, (state) => {
    state.ratingForm.reset();
    return { ...state, ratingForm: new FormGroup(state.ratingForm.controls) }
  }),
  on(fromActions.RESET_REVIEW_FORM, (state) => {
    state.reviewForm.reset();
    return { ...state, reviewForm: new FormGroup(state.reviewForm.controls) }
  })
);

export function readedShelfReducer(state: ReadedShelfState, action: Action) {
  return reducer(state, action);
};


function createReviewForm() {
  return new FormGroup({
    shelfs: new FormControl([], []),
    oldReview: new FormControl(null),
    comment: new FormControl('', [Validators.required, Validators.minLength(3), Validators.min(3)]),
    spoilerComment: new FormControl(false),
    hasReview: new FormControl(false)
  })
}

function createRatingForm() {
  return new FormGroup({
    oldGrade: new FormControl(),
    selectedGrade: new FormControl(),
  })
}
