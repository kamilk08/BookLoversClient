import { createAction, props } from '@ngrx/store';
import { UUID } from 'angular2-uuid';
import { Librarian } from '../../api/librarians/models/librarian.model';

export const SELECT_LIBRARIAN_BY_ID = createAction('[LIBRARIANS] Select librarian by', props<{ payload: { id: number } }>());
export const SELECT_LIBRARIAN_BY_READER_GUID = createAction('[LIBRARIANS] Select librarian by guid', props<{ payload: { guid: UUID } }>());
export const FETCH_LIBRARIAN = createAction('[LIBRARIANS] Fetch librarian', props<{ payload: { librarian: Librarian } }>());
export const FETCH_MULTIPLE_LIBRARIANS = createAction('[LIBRARIANS] Fetch multiple librarians', props<{ payload: { librarians: Librarian[] } }>());
export const REMOVE_LIBRARIAN = createAction('[LIBRARANS] Remove librarian', props<{ payload: { librarianId: number } }>());
export const SELECT_LIBRARIAN_ERROR = createAction('[LIBRARIANS] Select librarian error', props<{ payload: { error: any } }>());
