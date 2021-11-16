import { FormGroup } from "@angular/forms";
import { createAction, props } from "@ngrx/store";
import { SelectedImage } from "src/app/modules/shared/models/selected-image";
import { Book, BookHashTag } from "../../../api/books/models";

export const SUBMIT_EDIT_BOOK_FORM = createAction('[EDIT_BOOK] Submit edit book form', props<{ payload: { form: FormGroup } }>());
export const SET_BOOK_TO_EDIT = createAction('[EDIT_BOOK] Set book to edit', props<{ payload: { book: Book } }>());
export const UPDATE_EDIT_BOOK_FORM_VALIDITY = createAction('[EDIT_BOOK] Update edit book form validity');
export const EDIT_BOOK_FORM_VALID = createAction('[EDIT_BOOK] Edit book form valid');
export const EDIT_BOOK_FORM_INVALID = createAction('[EDIT_BOOK] Edit book form invalid');
export const RESET_EDIT_BOOK_FORM = createAction('[EDIT_BOOK] Reset edit book form');
export const EDIT_BOOK_COVER = createAction('[EDIT_BOOK] Edit book cover', props<{ payload: { image: SelectedImage } }>());
export const ADD_BOOK_HASH_TAG_TO_EDIT_BOOK_FORM = createAction('[EDIT_BOOK] Add book hashtag to edit form', props<{ payload: { hashTag: BookHashTag } }>());
export const REMOVE_BOOK_HASH_TAG_FORM_EDIT_BOOK_FORM = createAction('[EDIT_BOOK] Remove book hashtag from edit form', props<{ payload: { hashTag: BookHashTag } }>());
