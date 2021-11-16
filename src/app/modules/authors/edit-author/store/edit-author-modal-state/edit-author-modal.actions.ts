import { FormGroup } from "@angular/forms";
import { createAction, props } from "@ngrx/store";
import { Book } from "src/app/modules/api/books/models";
import { SelectedImage } from "src/app/modules/shared/models/selected-image";
import { Author } from "../../../../api/authors/authors/models/author.model";

export const SET_AUTHOR_ON_EDIT_AUTHOR_PAGE = createAction('[EDIT_AUTHOR] Set author id on edit author page', props<{ payload: { author: Author } }>());
export const SET_AUTHOR_BOOKS_ON_EDIT_AUTHOR_PAGE = createAction('[EDIT_AUTHOR] Set edit author books on edit page', props<{ payload: { books: Book[] } }>());
export const SET_AUTHOR_IMAGE_ON_EDIT_AUTHOR_FORM = createAction('[EDIT_AUTHOR] Set author image on edit form', props<{ payload: { selectedImage: SelectedImage } }>());
export const SUBMIT_EDIT_AUTHOR_FORM = createAction('[EDIT_AUTHOR] Submit edit author form', props<{ payload: { form: FormGroup } }>());
export const EDIT_AUTHOR_FORM_VALID = createAction('[EDIT_AUTHOR] Edit author form valid');
export const EDIT_AUTHOR_FORM_INVALID = createAction('[EDIT_AUTHOR] Edit author form invalid');
export const RESET_EDIT_AUTHOR_FORM = createAction('[EDIT_AUTHOR] Reset edit author form');

