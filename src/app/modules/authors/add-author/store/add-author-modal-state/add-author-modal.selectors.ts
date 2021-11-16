import { createSelector } from "@ngrx/store";
import { FullName } from "src/app/modules/shared";
import { SelectedImage } from "src/app/modules/shared/models/selected-image";
import { addAuthorModuleState, AddAuthorModuleState } from "..";
import { AuthorBasics } from "../../../../api/authors/authors/models/author-basics.model";
import { AuthorDescription } from "../../../../api/authors/authors/models/author-description.model";
import { AuthorDetails } from "../../../../api/authors/authors/models/author-details.model";
import { Author } from "../../../../api/authors/authors/models/author.model";
import { AddAuthorModalState } from "./add-author-modal.reducer";

const addAuthorModalState = createSelector(addAuthorModuleState, (state: AddAuthorModuleState) => state.addAuthorModal);

export const addAuthorForm = createSelector(addAuthorModalState, (state: AddAuthorModalState) => state.form);

export const authorToAdd = (userId: number) => createSelector(addAuthorModalState, (state: AddAuthorModalState) => {
  if (!state.form.valid)
    return undefined;

  const fullName = new FullName(state.form.get('firstName').value, state.form.get('secondName').value);

  const basics = new AuthorBasics(fullName, state.form.get('sex').value);

  const description = new AuthorDescription(state.form.get('about').value,
    state.form.get('descriptionSource').value, state.form.get('website').value);

  const details = new AuthorDetails(state.form.get('birthDate').value,
    state.form.get('deathDate').value, state.form.get('birthPlace').value, userId);

  const categories = state.form.get('categories').value;

  return new Author(basics, description, details, categories === null ? [] : categories);
});

export const authorImage = createSelector(addAuthorModalState, (state: AddAuthorModalState) => {
  return state.form.get('image').value as SelectedImage;
})

