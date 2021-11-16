import { FormControl, FormGroup } from "@angular/forms";
import { Action, createReducer, on } from "@ngrx/store";
import { SubCategory } from "../../api/books/models/sub-category.model";
import { BrowseCriteriaDetails } from "../../api/browse/models/browse-criteria-details.model";
import { BrowsePagination } from "../../api/browse/models/browse-criteria-pagination.model";
import { BrowseCriteria } from "../../api/browse/models/browse-criteria.model";
import { ALL_SUBCATEGORIES } from "../../books/common/categories";
import * as fromActions from './browse-page.actions';

export interface BrowsePageState {
  categories: Array<{ category: SubCategory, checked: boolean, localIndex: number }>,
  browseCriteria: BrowseCriteria,
  selectedCategories: number[],
  titleForm: FormGroup;
  detailsForm: FormGroup
}

const initialState: BrowsePageState = {
  categories: ALL_SUBCATEGORIES.map((s, i) => {
    return { category: s, checked: false, localIndex: i }
  }),
  browseCriteria: defaultCriteria(),
  selectedCategories: [],
  titleForm: buildTitleForm(),
  detailsForm: buildDetailsForm()
};


const reducer = createReducer(initialState,

  on(fromActions.SELECT_CATEGORY, (state, action) => {
    const checked = state.categories[action.payload.localIndex].checked;
    state.categories[action.payload.localIndex].checked = !checked;

    return { ...state }
  }),
  on(fromActions.ADD_CATEGORY, (state, action) => {

    const categories = state.selectedCategories;
    categories.push(action.payload.id);

    return { ...state, selectedCategories: [...categories] }
  }),
  on(fromActions.REMOVE_CATEGORY, (state, action) => {

    const categories = state.selectedCategories;
    const index = categories.indexOf(action.payload.id);
    categories.splice(index, 1);

    return { ...state, selectedCategories: [...categories] }
  }));


export function browsePageReducer(state: BrowsePageState, action: Action) {
  return reducer(state, action);
}

function buildTitleForm() {
  return new FormGroup({
    title: new FormControl(undefined),
  });
};

function buildDetailsForm() {
  return new FormGroup({
    author: new FormControl(undefined),
    isbn: new FormControl(undefined),
    from: new FormControl(undefined),
    till: new FormControl(undefined),
  })

};

function defaultCriteria() {
  const criteriaDetails = BrowseCriteriaDetails.defaultCriteria();
  const pagination = BrowsePagination.defaultPagination();

  return new BrowseCriteria('', null, criteriaDetails, pagination);
}

