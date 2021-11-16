
import * as fromActions from './bookcase-preview.actions';
import { createReducer, on, Action } from '@ngrx/store';
import { Bookcase, Shelf } from '../../models';

export interface ManageBookcase {
  bookcase: Bookcase
  bookId: number
  currentShelfTags: Array<{ tagText: string, tagData: { linkedShelf: Shelf } }>
  availableShelves: Array<Shelf>
  selectedShelf: Shelf
  removedShelfTag: { tagText: string, tagData: { linkedShelf: Shelf } }
  processing: boolean
  error: any
}

const initialState: ManageBookcase = {
  bookcase: undefined,
  bookId: undefined,
  currentShelfTags: new Array<{ tagText: string, tagData: { linkedShelf: Shelf } }>(),
  availableShelves: [],
  selectedShelf: undefined,
  removedShelfTag: undefined,
  processing: false,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.SET_BOOK_ID_ON_BOOKCAS_PREVIEW, (state, action) => {
    return { ...state, bookId: action.payload.bookId }
  }),
  on(fromActions.SET_BOOKCASE_TO_MANAGE, (state, action) => {
    const availableShelves = action.payload.bookcase.getCustomShelves().filter(p => !p.books.includes(state.bookId));
    return {
      ...state, bookcase: { ...action.payload.bookcase } as Bookcase,
      availableShelves,
      processing: false
    };
  }),
  on(fromActions.ADD_OR_UPDATE_BOOKCASE_PREVIEW, (state, action) => {
    const availableShelves = action.payload.bookcase.getCustomShelves().filter(p => !p.books.includes(state.bookId));

    const bookOnShelves = action.payload.bookcase.getShelvesWithBook(state.bookId);
    let shelfTags = [];
    bookOnShelves.forEach(shelf => shelfTags.push({ tagText: shelf.name, tagData: { linkedShelf: shelf } }))

    return {
      ...state, bookcase: { ...action.payload.bookcase } as Bookcase,
      availableShelves,
      currentShelfTags: shelfTags,
      processing: false
    }
  }),
  on(fromActions.SELECT_SHELF, (state, action) => {
    return { ...state, selectedShelf: action.payload.shelf }
  }),
  on(fromActions.SELECT_SHELF_TAG, (state, action) => {
    return { ...state, removedShelfTag: action.payload.shelfTag }
  }),
  on(fromActions.ADD_SHELF_TAG, (state, action) => {
    const newShelfTags = state.currentShelfTags;
    const newShelfTag = { tagText: action.payload.shelf.name, tagData: { linkedShelf: action.payload.shelf } };
    if (!state.currentShelfTags.some(s => s.tagData.linkedShelf === newShelfTag.tagData.linkedShelf))
      newShelfTags.push(newShelfTag);

    return { ...state, currentShelfTags: newShelfTags }
  }),
  on(fromActions.REMOVE_SHELF_TAG, (state, action) => {

    const newShelfTags = state.currentShelfTags;
    const shelfTag = newShelfTags.find(f => f.tagData.linkedShelf === action.payload.shelf);
    const index = newShelfTags.indexOf(shelfTag);
    newShelfTags.splice(index, 1);

    return { ...state, currentShelfTags: newShelfTags }
  }),
  on(fromActions.REMOVE_AVAILABLE_SHELF, (state, action) => {

    const shelves = state.availableShelves;

    const index = shelves.indexOf(action.payload.shelf);
    shelves.splice(index, 1);

    return { ...state, availableShelves: shelves };
  }),
  on(fromActions.ADD_AVAILABE_SHELF, (state, action) => {
    const shelves = state.availableShelves;
    shelves.push(action.payload.shelf);

    return { ...state, availableShelves: shelves }
  }),
  on(fromActions.RESET_BOOKCASE_PREVIEW, (state, action) => {
    return { ...state, currentShelfTags: [], selectedShelf: undefined, removedShelfTag: undefined }
  }),
  on(fromActions.CHECK_AVAILABLE_SHELVES, (state) => {
    const availableShelves = state.bookcase.getCustomShelves().filter(p => !p.books.includes(state.bookId));

    return { ...state, availableShelves }
  })
);

export function manageBookcaseReducer(state: ManageBookcase, action: Action) {
  return reducer(state, action);
}
