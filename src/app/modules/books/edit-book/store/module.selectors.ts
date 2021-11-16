import { createSelector } from "@ngrx/store"; import { editBookModuleState, EditBookState } from ".";
import { EditBookFormState } from "./edit-book-form.reducer";
import { EditBookPageState } from "./edit-book-page.reducer";
import { ProcessEditedBook } from "./edit-book.reducer";

const editBookFormState = createSelector(editBookModuleState, (state: EditBookState) => state.editBookFormState);
const processEditedBookState = createSelector(editBookModuleState, (state: EditBookState) => state.processEditBookState);
const editBookPageActionState = createSelector(editBookModuleState, (state: EditBookState) => state.editBookPageState);

export const processingBook = createSelector(processEditedBookState, (state: ProcessEditedBook) => state.processing);

export const bookToEdit = createSelector(editBookFormState, (state: EditBookFormState) => {
  if (state) return state.book;

  return undefined;
});
export const editForm = createSelector(editBookFormState, (state: EditBookFormState) => {
  if (state) return state.form;

  return undefined;
});

export const sectionState = (optionId: number) => createSelector(editBookPageActionState, (state: EditBookPageState) => {
  if (state && optionId) {
    const sectionState = state.toggleOptions[optionId];
    return sectionState;
  }

  return undefined;
});

export const error = createSelector(processEditedBookState, (state: ProcessEditedBook) => {
  if (state) return state.error;

  return undefined;
})
