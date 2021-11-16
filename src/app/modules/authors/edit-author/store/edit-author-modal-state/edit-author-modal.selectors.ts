import { createSelector } from "@ngrx/store";
import { ALL_SUBCATEGORIES } from "src/app/modules/books/common/categories";
import { FullName } from "src/app/modules/shared";
import { SelectedImage } from "src/app/modules/shared/models/selected-image";
import { editAuthorModuleSelector, EditAuthorModuleState } from "..";
import { AuthorBasics } from "../../../../api/authors/authors/models/author-basics.model";
import { AuthorDescription } from "../../../../api/authors/authors/models/author-description.model";
import { AuthorDetails } from "../../../../api/authors/authors/models/author-details.model";
import { EditAuthorModalState } from "./edit-author-modal.reducer";

const editAuthorModalState = createSelector(editAuthorModuleSelector, (state: EditAuthorModuleState) => {
  if (state) return state.editAuthorModal;

  return undefined;
});

export const editAuthorForm = createSelector(editAuthorModalState, (state: EditAuthorModalState) => {
  if (state) return state.form;

  return undefined;
});
export const author = createSelector(editAuthorModalState, (state: EditAuthorModalState) => {
  if (state) return state.author;

  return undefined;
});

export const editedAuthor = (userId: number) => createSelector(editAuthorModalState, (state: EditAuthorModalState) => {
  if (!state || !state.form) return undefined;

  if (!state.form.valid) return undefined;

  const fullName = new FullName(state.form.get('firstName').value, state.form.get('secondName').value);
  const basics = new AuthorBasics(fullName, state.form.get('sex').value);
  const description = new AuthorDescription(state.form.get('about').value,
    state.form.get('descriptionSource').value, state.form.get('website').value);
  const details = new AuthorDetails(state.form.get('birthDate').value,
    state.form.get('deathDate').value, state.form.get('birthPlace').value, userId);
  const categories = state.form.get('categories').value;

  const editedAuthor = state.author;
  if (editedAuthor === undefined) return undefined;

  editedAuthor.basics = basics;
  editedAuthor.description = description;
  editedAuthor.details = details;
  editedAuthor.genres = ALL_SUBCATEGORIES.filter(p => categories.includes(p.id));

  return editedAuthor;

});

export const editAuthorImage = createSelector(editAuthorModalState, (state: EditAuthorModalState) => {
  if (state) return state.form.get('image').value as SelectedImage;

  return undefined;
})
