import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Query } from 'src/app/modules/shared/common/query';
import { Book } from '../../../api/books/models/book.model';

export const START_FILTERING_BOOKS = createAction('[BOOKS] Start filtering books', props<{ payload: { query: Query } }>());
export const STOP_FILTERING_BOOKS = createAction('[BOOKS] Stop filtering books');
export const FETCH_FILTERED_BOOKS = createAction('[BOOKS] Fetch filtered books', props<{ payload: { books: Book[] } }>());
export const FILTER_BOOK_FALIURE = createAction('[BOOKS] Filter book action faliure', props<{ payload: { error: ApiError } }>());
export const CLEAR_FILTERED_BOOKS = createAction('[BOOKS] Clear filtered books');
