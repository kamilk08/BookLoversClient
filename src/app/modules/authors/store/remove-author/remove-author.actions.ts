import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Author } from '../../../api/authors/authors/models/author.model';

export const REMOVE_AUTHOR = createAction('[AUTHORS] Remove author', props<{ payload: { author: Author } }>());
export const REMOVE_AUTHOR_FALIURE = createAction('[AUTHORS] Remove author faliure', props<{ payload: { model: ApiError } }>());
export const REMOVE_AUTHOR_SUCCESS = createAction('[AUTHORS] Remove author success');
