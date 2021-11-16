import { ToggleOptions } from "../../../common/book-page-sections";
import { AddBookPageState } from "../add-book-page.reducer";
import * as fromActions from '../add-book-page.actions';
import * as fromReducer from '../add-book-page.reducer';

describe('ADD_BOOK_PAGE_REDUCER', () => {

  const initialState: AddBookPageState = {
    toggleOptions: {
      [ToggleOptions.basics]: true,
      [ToggleOptions.description]: true,
      [ToggleOptions.series]: true,
      [ToggleOptions.details]: true,
      [ToggleOptions.cover]: true
    }
  };

  it('should return new state with toggle option switched to true or false', () => {

    const action = fromActions.TOGGLE_ADD_BOOK_PAGE_SECTION({ payload: { optionId: ToggleOptions.basics } });

    const newState = fromReducer.addBookPageReducer(initialState, action);

    expect(newState.toggleOptions[ToggleOptions.basics]).toBeFalsy();
  });

})
