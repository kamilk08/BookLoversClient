import { createSelector } from "@ngrx/store";
import { browseMainSelector, BrowseModuleState } from ".";
import { BrowseCriteriaDetails } from "../../api/browse/models/browse-criteria-details.model";
import { BrowsePagination } from "../../api/browse/models/browse-criteria-pagination.model";
import { BrowseCriteria } from "../../api/browse/models/browse-criteria.model";
import { DEFAULT_ITEMS_COUNT } from "../../shared/common/query";
import { BrowsePageState } from "./browse-page.reducer";

const pageState = createSelector(browseMainSelector, (state: BrowseModuleState) => {
  if (state) return state.browsePageState;

  return undefined;
});

export const categories = createSelector(pageState, (state: BrowsePageState) => {
  if (state) {
    return state.categories
  }
  return undefined;
})

export const selectedCategories = createSelector(pageState, (state: BrowsePageState) => {
  if (state) {
    return state.selectedCategories;
  }

  return undefined;
});


export const titleForm = createSelector(pageState, (state: BrowsePageState) => {
  if (state) {
    return state.titleForm;
  }

  return undefined;
});

export const detailsForm = createSelector(pageState, (state: BrowsePageState) => {
  if (state) {
    return state.detailsForm;
  }

  return undefined;
});

export const browseCriteria = (page: number) => createSelector(pageState, (state: BrowsePageState) => {
  if (state) {

    const title = state.titleForm.get('title').value;
    const details = state.detailsForm.value;
    const criteriaDetails = new BrowseCriteriaDetails(details.author, details.isbn, details.from, details.till);

    return new BrowseCriteria(title, state.selectedCategories, criteriaDetails, new BrowsePagination(page, DEFAULT_ITEMS_COUNT));
  }

  return undefined;
})
