import { createAction, props } from '@ngrx/store';
import { Query } from 'src/app/modules/shared/common/query';

export const SELECT_SHELVES_WITH_BOOK = createAction('[BOOKCASE_STATISTICS] Select shelves book with book', props<{ payload: { bookId: number, query: Query } }>());
export const FETCH_SHELVES_WITH_BOOK = createAction('[BOOKCASE_STATISTICS] Fetch shelves with book', props<{ payload: { statistics: any } }>());
export const FETCH_SHELVES_WITH_BOOK_FALIURE = createAction('[BOOKCASE_STATISTICS] Fetch shelves with book faliure', props<{ payload: { error: any } }>());
