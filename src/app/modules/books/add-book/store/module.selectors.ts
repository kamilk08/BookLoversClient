import { createSelector } from '@ngrx/store';
import { addBookModuleState, AddBookState } from '.';
import { AddBookPageState } from './add-book-page.reducer';
import { NewBookFormState } from './new-book-form.reducer';
import { ProcessBookState } from './process-book.reducer';

const processingBookState = createSelector(addBookModuleState, (state: AddBookState) => state.processBookState);
const newBookFormState = createSelector(addBookModuleState, (state: AddBookState) => state.newBookFormState);
const addBookPageState = createSelector(addBookModuleState, (state: AddBookState) => state.addBookPageState);

export const processingNewBook = createSelector(processingBookState, (state: ProcessBookState) => state.processing);

export const bookForm = createSelector(newBookFormState, (state: NewBookFormState) => state.form);
export const sectionState = (optionId: number) => createSelector(addBookPageState, (state: AddBookPageState) => {
  if (state && optionId) {
    const sectionState = state.toggleOptions[optionId];
    return sectionState;
  }

  return undefined;
})
