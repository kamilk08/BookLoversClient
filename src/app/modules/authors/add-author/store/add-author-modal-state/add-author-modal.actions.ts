import { FormGroup } from "@angular/forms";
import { createAction, props } from "@ngrx/store";
import { SelectedImage } from "src/app/modules/shared/models/selected-image";
import { AddAuthorModel } from "../../../../api/authors/add-author/models/add-author.model";

export const SUBMIT_ADD_AUTHOR_FORM = createAction('[ADD_AUTHOR] Submit add author form', props<{ payload: { form: FormGroup } }>());
export const SET_AUTHOR_IMAGE_ON_FORM = createAction('[ADD_AUTHOR] Set author image on form', props<{ payload: { selectedImage: SelectedImage } }>());
export const ADD_AUTHOR_FORM_VALID = createAction('[ADD_AUTHOR] Add author form valid');
export const ADD_AUTHOR_FORM_INVALID = createAction('[ADD_AUTHOR] Add author form invalid');
export const RESET_ADD_AUTHOR_FORM = createAction('[ADD_AUTHOR] Reset add author form');

export const MOVE_AUTHOR_DATA_TO_TICKET_MODULE = createAction('[ADD_AUTHOR] Move atuhor data to ticket module', props<{ payload: { model: AddAuthorModel } }>());
