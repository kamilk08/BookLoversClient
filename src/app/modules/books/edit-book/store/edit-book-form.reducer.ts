import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Action, createReducer, on } from "@ngrx/store";
import { updateFormValidity } from "src/app/modules/shared/common/update-form-validity";
import { BookFormExtensions } from "../../add-book/store/new-book-form.extensions";
import { Book } from "../../../api/books/models";
import * as fromActions from './edit-book-form.actions';

export interface EditBookFormState {
  book: Book,
  form: FormGroup
}

const initialState: EditBookFormState = {
  book: undefined,
  form: buildBookForm()
}

const reducer = createReducer(initialState,
  on(fromActions.SUBMIT_EDIT_BOOK_FORM, (state, action) => {

    return { ...state, form: action.payload.form };
  }),
  on(fromActions.SET_BOOK_TO_EDIT, (state, action) => {
    const form = updateForm(action.payload.book, state.form);

    return { ...state, book: action.payload.book, form: new FormGroup(form.controls) }
  }),
  on(fromActions.EDIT_BOOK_FORM_INVALID, (state) => {
    const form = state.form as FormGroup;
    let newForm = new FormGroup(form.controls);
    updateFormValidity(newForm);

    return { ...state, form: newForm }
  }),
  on(fromActions.EDIT_BOOK_FORM_VALID, (state) => {
    const form = new FormGroup(state.form.controls);

    return { ...state, form: form }
  }),
  on(fromActions.RESET_EDIT_BOOK_FORM, (state) => {
    const form = state.form;
    form.reset();
    return { ...state, form: new FormGroup(form.controls) }
  }),
  on(fromActions.EDIT_BOOK_COVER, (state, action) => {
    state.form.get('cover').setValue(action.payload.image);
    state.form.get('isCoverAdded').setValue(true);

    const newForm = new FormGroup(state.form.controls);

    return { ...state, form: newForm }
  }),
  on(fromActions.ADD_BOOK_HASH_TAG_TO_EDIT_BOOK_FORM, (state, action) => {
    let hashTags = BookFormExtensions.bookHashTags(state.form);
    hashTags.push(action.payload.hashTag);
    state.form.get('hashTags').setValue(hashTags);

    const newForm = new FormGroup(state.form.controls);

    return { ...state, form: newForm }
  }),
  on(fromActions.REMOVE_BOOK_HASH_TAG_FORM_EDIT_BOOK_FORM, (state, action) => {
    let hashTags = BookFormExtensions.bookHashTags(state.form);
    const index = hashTags.findIndex(f => f === action.payload.hashTag);
    hashTags.splice(index, 1);
    state.form.get('hashTags').setValue(hashTags);

    const newForm = new FormGroup(state.form.controls);

    return { ...state, form: newForm }
  })
);

export function editBookFormReducer(state: EditBookFormState = initialState, action: Action) {
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

function updateForm(book: Book, form: FormGroup) {
  form.patchValue({
    'title': book.basics.title,
    'isbn': book.basics.isbn,
    'category': book.basics.bookCategory,
    'published': book.publisher.published,
    'description': book.description.content,
    'descriptionSource': book.description.source,
    'hashTags': book.hashTags,
    'language': book.details.language,
    'pages': book.details.pages,
    'coverType': book.cover.coverType,
    'isCoverAdded': book.cover.isCoverAdded,
    'coverSource': book.cover.source
  });

  if (book.series)
    form.get('seriesPosition').patchValue(book.series.positionInSeries);

  return form;
}
