import { FormGroup } from "@angular/forms";
import { createAction, props } from "@ngrx/store";
import { SelectedImage } from "src/app/modules/shared/models/selected-image";
import { BookHashTag } from "../../../api/books/models";
import { AddNewBook } from "../../../api/books/add/models/add-book.model";


export const SUBMIT_BOOK_FORM = createAction('[ADD_BOOK] Submit book form', props<{ payload: { form: FormGroup } }>());
export const INITIALIZE_BOOK_FORM = createAction('[ADD_BOOK] Initialize book form');
export const BOOK_FORM_VALID = createAction('[ADD_BOOK] Book form valid');
export const BOOK_FORM_INVALID = createAction('[ADD_BOOK] Book form invalid');
export const RESET_BOOK_FORM = createAction('[ADD_BOOK] Reset book form');
export const ADD_BOOK_COVER = createAction('[ADD_BOOK] Add book cover', props<{ payload: { image: SelectedImage } }>());
export const ADD_BOOK_HASH_TAG_TO_BOOK_FORM = createAction('[ADD_BOOK] Add book hashtag to book form', props<{ payload: { hashTag: BookHashTag } }>());
export const REMOVE_BOOK_HASH_TAG_FROM_BOOK_FORM = createAction('[ADD_BOOK] Remove book hashtag from book form', props<{ payload: { hashTag: BookHashTag } }>());
export const MOVE_BOOK_DATA_TO_TICKET_MODULE = createAction('[ADD_BOOK] Move data to tickt module', props<{ payload: { model:AddNewBook } }>());
