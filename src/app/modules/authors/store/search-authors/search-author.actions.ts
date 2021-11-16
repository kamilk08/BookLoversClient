import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Query } from 'src/app/modules/shared/common/query';
import { Author } from '../../../api/authors/authors/models/author.model';

export const START_FILTERING_AUTHORS = createAction('[AUTHORS] Start filtering authors', props<{ payload: { query: Query } }>());
export const STOP_FILTERING_AUTHORS = createAction('[AUTHORS] Stop filtering authors');
export const FETCH_FILTERED_AUTHORS = createAction('[AUTHORS] Fetch filtered authors', props<{ payload: { authors: Author[] } }>());
export const FILTER_AUTHOR_FALIURE = createAction('[AUTHORS] Filter author faliure', props<{ payload: { model: ApiError } }>());
export const CLEAR_SEARCH_RESULTS = createAction('[AUTHORS] Clear author results');
