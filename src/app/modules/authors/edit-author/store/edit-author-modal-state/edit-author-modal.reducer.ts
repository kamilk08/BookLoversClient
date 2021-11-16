import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Action, createReducer, on } from "@ngrx/store";
import { updateFormValidity } from "src/app/modules/shared/common/update-form-validity";
import { Author } from "../../../../api/authors/authors/models/author.model";
import * as fromActions from './edit-author-modal.actions';

export interface EditAuthorModalState {
  author: Author
  form: FormGroup
};

const initialState: EditAuthorModalState = {
  author: undefined,
  form: createEditAuthorForm()
};

const reducer = createReducer(initialState,
  on(fromActions.SET_AUTHOR_ON_EDIT_AUTHOR_PAGE, (state, action) => {
    updateEditAuthorForm(state.form, action.payload.author);

    return { ...state, author: action.payload.author, form: new FormGroup(state.form.controls) }
  }),
  on(fromActions.SET_AUTHOR_BOOKS_ON_EDIT_AUTHOR_PAGE, (state, action) => {
    return { ...state, books: action.payload.books }
  }),
  on(fromActions.SUBMIT_EDIT_AUTHOR_FORM, (state) => ({ ...state })),
  on(fromActions.EDIT_AUTHOR_FORM_VALID, (state) => ({ ...state })),
  on(fromActions.EDIT_AUTHOR_FORM_INVALID, (state) => {
    updateFormValidity(state.form);

    return { ...state, form: new FormGroup(state.form.controls) }
  }),
  on(fromActions.RESET_EDIT_AUTHOR_FORM, (state) => {
    state.form.reset();

    return { ...state, form: new FormGroup(state.form.controls) }
  }),
  on(fromActions.SET_AUTHOR_IMAGE_ON_EDIT_AUTHOR_FORM, (state, action) => {
    state.form.get('image').setValue(action.payload.selectedImage);
    return { ...state, form: new FormGroup(state.form.controls) };
  })
)

export function editAuthorModalReducer(state: EditAuthorModalState, action: Action) {
  return reducer(state, action);
}

function updateEditAuthorForm(form: FormGroup, author: Author) {

  form.get('firstName').patchValue(author.basics.fullName.firstName);
  form.get('secondName').patchValue(author.basics.fullName.secondName);
  form.get('birthDate').patchValue(author.details.birthDate);
  form.get('deathDate').patchValue(author.details.deathDate);
  form.get('sex').patchValue(author.basics.sex.id);
  form.get('about').patchValue(author.description.about);
  form.get('website').patchValue(author.description.website);
  form.get('birthPlace').patchValue(author.details.birthPlace);
  form.get('descriptionSource').patchValue(author.description.source);
  form.get('categories').patchValue(author.genres.map(s => s.id));

}

function createEditAuthorForm() {
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
