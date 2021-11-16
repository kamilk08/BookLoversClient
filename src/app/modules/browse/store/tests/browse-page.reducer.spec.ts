import { FormControl, FormGroup } from '@angular/forms';
import { BrowseCriteriaDetails } from 'src/app/modules/api/browse/models/browse-criteria-details.model';
import { BrowsePagination } from 'src/app/modules/api/browse/models/browse-criteria-pagination.model';
import { BrowseCriteria } from 'src/app/modules/api/browse/models/browse-criteria.model';
import { ALL_SUBCATEGORIES } from 'src/app/modules/books/common/categories';
import * as fromActions from '../browse-page.actions';
import * as fromReducer from '../browse-page.reducer';
import { BrowsePageState } from '../browse-page.reducer';

describe('BROWSE_PAGE_REDUCER', () => {

  let initialState: BrowsePageState;

  beforeEach(() => {
    initialState = {
      categories: ALL_SUBCATEGORIES.map((s, i) => {
        return { category: s, checked: false, localIndex: i }
      }),
      browseCriteria: defaultCriteria(),
      selectedCategories: [],
      titleForm: buildTitleForm(),
      detailsForm: buildDetailsForm()
    };
  });

  describe('ADD_CATEGORY', () => {
    it('should return new state with selectedCategories property containing category id.', () => {

      const action = fromActions.ADD_CATEGORY({ payload: { id: ALL_SUBCATEGORIES[0].id } });

      const newState = fromReducer.browsePageReducer(initialState, action);

      expect(newState.selectedCategories.includes(ALL_SUBCATEGORIES[0].id)).toBeTruthy();
      expect(newState.selectedCategories.length).toBe(1);
    });
  });

  describe('REMOVE_CATEGORY', () => {
    it('should return new state with selectedCategories property not containing previously selected id', () => {

      const addAction = fromActions.ADD_CATEGORY({ payload: { id: ALL_SUBCATEGORIES[0].id } });

      const newState = fromReducer.browsePageReducer(initialState, addAction);

      const removeAction = fromActions.REMOVE_CATEGORY({ payload: { id: ALL_SUBCATEGORIES[0].id } });

      const lastState = fromReducer.browsePageReducer(newState, removeAction);

      expect(lastState.selectedCategories.length).toBe(0);
    });

  });

});
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
