import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromModule from '../store/edit-book.reducer';
import * as fromSelectors from '../store/module.selectors';
import { Book } from '../../../api/books/models/book.model';
import { ADD_BOOK_HASH_TAG_TO_EDIT_BOOK_FORM, EDIT_BOOK_COVER, REMOVE_BOOK_HASH_TAG_FORM_EDIT_BOOK_FORM, RESET_EDIT_BOOK_FORM, SET_BOOK_TO_EDIT, SUBMIT_EDIT_BOOK_FORM } from './edit-book-form.actions';
import { SelectedImage } from 'src/app/modules/shared/models/selected-image';
import { FormGroup } from '@angular/forms';
import { BookHashTag } from '../../../api/books/models';
import { TOGGLE_EDIT_BOOK_PAGE_SECTION } from './edit-book-page.actions';

@Injectable()
export class EditBookFacade {

  public readonly processing$ = this.store.select(fromSelectors.processingBook);
  public readonly editForm$ = this.store.select(fromSelectors.editForm);
  public readonly bookToEdit$ = this.store.select(fromSelectors.bookToEdit);

  public readonly error$ = this.store.select(fromSelectors.error);

  public readonly sectionState$ = (optionId: number) => this.store.select(fromSelectors.sectionState(optionId));

  constructor(private store: Store<fromModule.ProcessEditedBook>) { }

  changeCover(image: SelectedImage) {
    this.store.dispatch(EDIT_BOOK_COVER({ payload: { image } }))
  }

  submitForm(form: FormGroup) {
    this.store.dispatch(SUBMIT_EDIT_BOOK_FORM({ payload: { form } }));
  }

  setBookToEdit(book: Book) {
    this.store.dispatch(SET_BOOK_TO_EDIT({ payload: { book } }));
  }

  resetForm() {
    this.store.dispatch(RESET_EDIT_BOOK_FORM());
  }

  addHashTag(hashTag: BookHashTag) {
    this.store.dispatch(ADD_BOOK_HASH_TAG_TO_EDIT_BOOK_FORM({ payload: { hashTag } }));
  }

  removeHashTag(hashTag: BookHashTag) {
    this.store.dispatch(REMOVE_BOOK_HASH_TAG_FORM_EDIT_BOOK_FORM({ payload: { hashTag } }));
  }

  toggleSection(optionId: number) {
    this.store.dispatch(TOGGLE_EDIT_BOOK_PAGE_SECTION({ payload: { optionId } }));
  }
}
