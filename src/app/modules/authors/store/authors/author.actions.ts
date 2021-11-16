import { createAction, props } from '@ngrx/store';
import { UUID } from 'angular2-uuid';
import { Author } from '../../../api/authors/authors/models/author.model';
import { AuthorNotFound } from '../../models/author-not-found.model';
import { ApiError } from 'src/app/modules/api/api-error.model';

export const SELECT_AUTHOR = createAction('[AUTHORS] Select author', props<{ payload: { id: number } }>());
export const SELECT_MULTIPLE_AUTHORS_BY_IDS = createAction('[AUTHORS] Select multiple authors by ids', props<{ payload: { ids: number[] } }>());
export const SELECT_MULTIPLE_AUTHORS_BY_GUIDS = createAction('[AUTHORS] Select multiple authors by guids', props<{ payload: { guids: UUID[] } }>());
export const SELECT_AUTHOR_BY_GUID = createAction('[AUTHORS] Select author by guid', props<{ payload: { guid: UUID } }>());

export const FETCH_AUTHOR = createAction('[AUTHORS] Fetch author', props<{ payload: { author: Author } }>());
export const FETCH_MULTIPLE_AUTHORS = createAction('[AUTHORS] Fetch multiple authors', props<{ payload: { authors: Author[] } }>())
export const FETCH_AUTHOR_FALIURE = createAction('[AUTHORS] Author action faliure', props<{ payload: { model: ApiError } }>());
export const AUTHOR_NOT_FOUND = createAction('[AUTHORS] Author not found', props<{ payload: { model: AuthorNotFound } }>());
export const ADD_OR_UPDATE_AUTHOR = createAction('[AUTHORS] Add or update author', props<{ payload: { author: Author, authorId } }>());
export const DELETE_AUTHOR = createAction('[AUTHORS] Delete author', props<{ payload: { authorId: number } }>());


