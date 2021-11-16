import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Author } from '../../../../api/authors/authors/models/author.model';

export const FOLLOW_AUTHOR = createAction('[AUTHORS] Follow author', props<{ payload: { author: Author, userId: number } }>());
export const FOLLOW_AUTHOR_SUCCESS = createAction('[AUTHORS] Follow author success');
export const FOLLOW_AUTHOR_FALIURE = createAction('[AUTHORS] Follow author faliure', props<{ payload: { author: Author, userId: number, model: ApiError } }>());
