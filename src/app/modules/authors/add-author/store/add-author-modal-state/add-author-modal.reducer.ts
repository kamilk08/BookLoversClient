import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Action, createReducer, on } from "@ngrx/store";
import { updateFormValidity } from "src/app/modules/shared/common/update-form-validity";
import * as fromActions from './add-author-modal.actions';

export interface AddAuthorModalState {
  form: FormGroup
};

const initialState: AddAuthorModalState = {
  form: createAuthorForm()
};

const reducer = createReducer(initialState,
  on(fromActions.SUBMIT_ADD_AUTHOR_FORM, (state) => ({ ...state })),
  on(fromActions.ADD_AUTHOR_FORM_INVALID, (state) => {
    updateFormValidity(state.form);

    return { ...state, form: state.form }
  }),
  on(fromActions.ADD_AUTHOR_FORM_VALID, (state) => ({ ...state })),
  on(fromActions.MOVE_AUTHOR_DATA_TO_TICKET_MODULE, (state) => ({ ...state })),
  on(fromActions.RESET_ADD_AUTHOR_FORM, (state) => {
    state.form.reset();

    return { ...state, form: new FormGroup(state.form.controls) }
  }),
  on(fromActions.SET_AUTHOR_IMAGE_ON_FORM, (state, action) => {
    state.form.get('image').setValue(action.payload.selectedImage);

    return { ...state, form: new FormGroup(state.form.controls) };
  })
);

export function addAuthorModalReducer(state: AddAuthorModalState, action: Action) {
  return reducer(state, action);
}


function createAuthorForm() {
  return new FormGroup({
    firstName: new FormControl('', Validators.maxLength(128)),
    secondName: new FormControl('', [Validators.maxLength(128), Validators.required]),
    birthDate: new FormControl(null, []),
    deathDate: new FormControl(null, []),
    birthPlace: new FormControl('', [Validators.maxLength(255)]),
    sex: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(3)]),
    about: new FormControl('', [Validators.max(2083)]),
    website: new FormControl('', []),
    descriptionSource: new FormControl('', [Validators.maxLength(255)]),
    categories: new FormControl([]),
    image: new FormControl(null),
  });
}
