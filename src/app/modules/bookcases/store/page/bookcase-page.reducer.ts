import { Action, createReducer, on } from '@ngrx/store';
import { SortType } from 'src/app/modules/shared/common/sort-type';
import { Bookcase, Shelf } from '../../models';
import { SORT_BOOKCASE_BY_DATE } from '../../models/bookcase-sort-type';
import * as fromActions from '../page/bookcase-page.actions';


export interface BookcasePageState {
  readerId: number,
  currentBookcase: Bookcase,
  currentBookIds: number[],
  sortType: SortType,
  descending: boolean,
  searchPhrase: string,
  selectedShelves: Array<Shelf>,
  showSearchBar: boolean
};

const initialState: BookcasePageState = {
  readerId: undefined,
  currentBookcase: undefined,
  currentBookIds: [],
  sortType: SORT_BOOKCASE_BY_DATE,
  descending: true,
  searchPhrase: undefined,
  selectedShelves: [],
  showSearchBar: false
};

const reducer = createReducer(initialState,
  on(fromActions.SET_BOOKCASE_READER_ID, (state, action) => {

    return { ...state, readerId: action.payload.readerId }
  }),
  on(fromActions.SET_PAGE_BOOKCASE, (state, action) => {
    return { ...state, currentBookcase: action.payload.bookcase }
  }),
  on(fromActions.SET_CURRENT_BOOKIDS_ON_BOOKCASE_PAGE, (state, action) => {
    return { ...state, currentBookIds: action.payload.bookIds }
  }),
  on(fromActions.SET_SORT_TYPE_ON_BOOKCASE_PAGE, (state, action) => {
    return { ...state, sortType: action.payload.sortType }
  }),
  on(fromActions.SET_SORT_ORDER_ON_BOOKCASE_PAGE, (state, action) => {
    return { ...state, descending: action.payload.descending }
  }),
  on(fromActions.SET_SEARCH_PHRASE_ON_BOOKCASE_PAGE, (state, action) => {
    return { ...state, searchPhrase: action.payload.phrase === '' ? undefined : action.payload.phrase }
  }),
  on(fromActions.ADD_OR_REMOVE_SHELF_ON_BOOKCASE_PAGE, (state, action) => {

    const selectedShelves = state.selectedShelves

    const shelfIndex = selectedShelves.findIndex(f => f.identification.id === action.payload.shelf.identification.id);
    if (shelfIndex === -1) {
      selectedShelves.push(action.payload.shelf)
    }
    else {
      const shelf = selectedShelves[shelfIndex];
      selectedShelves.splice(shelfIndex, 1);

      shelf.books.forEach(bookId => {
        const bookIndex = state.currentBookIds.indexOf(bookId);
        state.currentBookIds.splice(bookIndex, 1);
      })
    }
    return { ...state, selectedShelves: [...selectedShelves], currentBookIds: [...state.currentBookIds] }
  }),
  on(fromActions.RESET_BOOKCASE_PAGE, (state) => ({ ...state, currentBookIds: [], selectedShelves: [] })),
  on(fromActions.TOGGLE_SEARCH_BAR, (state, action) => {
    return { ...state, showSearchBar: action.payload.flag }
  })
);

export function bookcasePageReducer(state: BookcasePageState, action: Action) {
  return reducer(state, action);
}
