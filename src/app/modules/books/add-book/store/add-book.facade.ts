import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ADD_BOOK_HASH_TAG_TO_BOOK_FORM, ADD_BOOK_COVER, INITIALIZE_BOOK_FORM, REMOVE_BOOK_HASH_TAG_FROM_BOOK_FORM, RESET_BOOK_FORM, SUBMIT_BOOK_FORM } from './new-book-form.actions';
import { FormGroup } from '@angular/forms';
import { SelectedImage } from 'src/app/modules/shared/models/selected-image';
import { BookHashTag } from '../../../api/books/models';
import { TOGGLE_ADD_BOOK_PAGE_SECTION } from './add-book-page.actions';

import * as fromModule from './index';
import * as fromSelectors from './module.selectors';

@Injectable()
export class AddBookFacade {

  public readonly processingBook$ = this.store.select(fromSelectors.processingNewBook);
  public readonly newBookForm$ = this.store.select(fromSelectors.bookForm);
  public readonly sectionState$ = (optionId: number) => this.store.select(fromSelectors.sectionState(optionId));

  constructor(private store: Store<fromModule.AddBookState>) { }

  initializeForm() {
    this.store.dispatch(INITIALIZE_BOOK_FORM());
  }

  submitForm(form: FormGroup) {
    this.store.dispatch(SUBMIT_BOOK_FORM({ payload: { form } }));
  }

  resetForm() {
    this.store.dispatch(RESET_BOOK_FORM());
  }

  changeCover(cover: SelectedImage) {
    this.store.dispatch(ADD_BOOK_COVER({ payload: { image: cover } }));
  }

  addHashTag(hashTag: BookHashTag) {
    this.store.dispatch(ADD_BOOK_HASH_TAG_TO_BOOK_FORM({ payload: { hashTag } }));
  }

  removeHashTag(hashTag: BookHashTag) {
    this.store.dispatch(REMOVE_BOOK_HASH_TAG_FROM_BOOK_FORM({ payload: { hashTag } }));
  }

  toggleSection(optionId: number) {
    this.store.dispatch(TOGGLE_ADD_BOOK_PAGE_SECTION({ payload: { optionId } }));
  }

}
