import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';

export const SELECT_BOOKCASES_WITH_BOOK = createAction('[BOOKCASE_STATISTICS] Select bookcases with book', props<{ payload: { bookId: number } }>());
export const SELECT_BOOKCASES_WITH_BOOKS = createAction('[BOOKCASE_STATISTICS] Select bookcases with books', props<{ payload: { bookIds: number[] } }>());
export const FETCH_BOOKCASE_WITH_BOOK = createAction('[BOOKCASE_STATISTICS] Fetch bookcases with books', props<{ payload: { bookcasesIds: number[], bookId: number } }>());
export const BOOKCASE_WITH_BOOK_FETCH_FALIURE = createAction('[BOOKCASE_STATISTICS] Fetch bookcases wtih books faliure', props<{ payload: { model: ApiError } }>());
