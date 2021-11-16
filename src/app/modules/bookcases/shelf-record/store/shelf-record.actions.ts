import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { ShelfRecord } from '../../../api/bookcases/shelf-records/models/shelf-record.model';

export const SELECT_SHELF_RECORD = createAction('[SHELF_RECORDS] Select shelf records', props<{ payload: { shelfId: number, bookId: number } }>());
export const SELECT_MULTIPLE_SHELF_RECORDS = createAction('[SHELF_RECORDS] Select multiple shelf records', props<{ payload: { bookIds: number[], bookcaseId: number } }>());
export const FETCH_SHELF_RECORD = createAction('[SHELF_RECORDS] Fetch shelf records', props<{ payload: { shelfRecord: ShelfRecord } }>());
export const FETCH_MULTIPLE_SHELF_RECORDS = createAction('[SHELF_RECORDS] Fetch multiple shelf records', props<{ payload: { shelfRecords: ShelfRecord[] } }>());
export const SHELF_RECORD_ACTION_FALIURE = createAction('[SHELF_RECORDS] Shelf record action faliure', props<{ payload: { model: ApiError } }>());


