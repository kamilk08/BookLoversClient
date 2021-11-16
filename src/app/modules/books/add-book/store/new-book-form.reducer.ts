import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Action, createReducer, on } from "@ngrx/store";
import { updateFormValidity } from "src/app/modules/shared/common/update-form-validity";
import * as fromActions from './new-book-form.actions';
import { BookFormExtensions } from "./new-book-form.extensions";

export interface NewBookFormState {
  form: FormGroup,
};

const initialState: NewBookFormState = {
  form: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.INITIALIZE_BOOK_FORM, (state) => {
    return { ...state, form: buildBookForm() }
  }),
  on(fromActions.SUBMIT_BOOK_FORM, (state, action) => {
    return { ...state, form: action.payload.form };
  }),
  on(fromActions.BOOK_FORM_INVALID, (state) => {
    const form = state.form as FormGroup;
    let newForm = new FormGroup(form.controls);
    updateFormValidity(newForm);

    return { ...state, form: newForm }
  }),
  on(fromActions.BOOK_FORM_VALID, (state) => {
    const form = new FormGroup(state.form.controls);

    return { ...state, form: form }
  }),
  on(fromActions.RESET_BOOK_FORM, (state) => {
    const form = state.form;
    form.reset();
    return { ...state, form: new FormGroup(form.controls) }
  }),
  on(fromActions.ADD_BOOK_COVER, (state, action) => {
    state.form.get('cover').setValue(action.payload.image);
    state.form.get('isCoverAdded').setValue(true);

    const newForm = new FormGroup(state.form.controls);

    return { ...state, form: newForm }
  }),
  on(fromActions.ADD_BOOK_HASH_TAG_TO_BOOK_FORM, (state, action) => {
    let hashTags = BookFormExtensions.bookHashTags(state.form);
    hashTags.push(action.payload.hashTag);
    state.form.get('hashTags').setValue(hashTags);

    const newForm = new FormGroup(state.form.controls);

    return { ...state, form: newForm }
  }),
  on(fromActions.REMOVE_BOOK_HASH_TAG_FROM_BOOK_FORM, (state, action) => {
    let hashTags = BookFormExtensions.bookHashTags(state.form);
    const index = hashTags.findIndex(f => f === action.payload.hashTag);
    hashTags.splice(index, 1);
    state.form.get('hashTags').setValue(hashTags);

    const newForm = new FormGroup(state.form.controls);

    return { ...state, form: newForm }
  })
);

export function newBookFormReducer(state: NewBookFormState, action: Action) {
  return reducer(state, action);
}

function buildBookForm() {
  return new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    authors: new FormControl([], [Validators.required]),
    publisher: new FormControl(null, [Validators.required]),
    published: new FormControl(null, []),
    isbn: new FormControl('', [Validators.required, Validators.maxLength(13)]),
    category: new FormControl(null, [Validators.required]),
    description: new FormControl('', [Validators.maxLength(2083)]),
    descriptionSource: new FormControl('', []),
    series: new FormControl(null),
    seriesPosition: new FormControl('', [Validators.min(1)]),
    publisherCycles: new FormControl([], []),
    hashTags: new FormControl([]),
    language: new FormControl(null, [Validators.min(0), Validators.max(2)]),
    pages: new FormControl(null, [Validators.min(1)]),
    coverSource: new FormControl(''),
    isCoverAdded: new FormControl(false, [Validators.required]),
    coverType: new FormControl(null, [Validators.min(1), Validators.max(3)]),
    cover: new FormControl(null)
  })
}
