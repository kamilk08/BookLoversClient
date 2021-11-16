import { createAction, props } from '@ngrx/store';
import { Bookcase, Shelf } from '../../models';

export const SET_BOOK_ID_ON_BOOKCAS_PREVIEW = createAction('[BOOKCASE_PREVIEW] Set bookId on bookcase preview', props<{ payload: { bookId: number } }>());
export const ADD_OR_UPDATE_BOOKCASE_PREVIEW = createAction('[BOOKCASE_PREVIEW] Add or update bookcase preview', props<{ payload: { bookcase: Bookcase } }>());
export const SET_BOOKCASE_TO_MANAGE = createAction('[BOOKCASE_PREVIEW] Set bookcase preview', props<{ payload: { bookcase: Bookcase } }>());

export const SELECT_SHELF = createAction('[BOOKCASE_PREVIEW] Select shelf', props<{ payload: { shelf: Shelf } }>());
export const SELECT_SHELF_TAG = createAction('[BOOKCASE_PREVIEW] Select shelf tag', props<{ payload: { shelfTag: { tagText: string, tagData: { linkedShelf: Shelf } } } }>());

export const ADD_SHELF_TAG = createAction('[BOOKCASE_PREVIEW] Add shelf tag', props<{ payload: { shelf: Shelf } }>());
export const REMOVE_SHELF_TAG = createAction('[BOOKCASE_PREVIEW] Remove shelf tag', props<{ payload: { shelf: Shelf } }>());
export const ADD_AVAILABE_SHELF = createAction('[BOOKCASE_PREVIEW] Add available shelf', props<{ payload: { shelf: Shelf } }>());
export const REMOVE_AVAILABLE_SHELF = createAction('[BOOKCASE_PREVIEW] Remove available shelf', props<{ payload: { shelf: Shelf } }>());

export const RESET_BOOKCASE_PREVIEW = createAction('[BOOKCASE_PREVIEW] Reset bookcase preview');
export const CHECK_AVAILABLE_SHELVES = createAction('[BOOKCASE_PREVIEW] Check available shvelves');
