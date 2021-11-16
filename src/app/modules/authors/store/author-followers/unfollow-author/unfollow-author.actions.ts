import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Author } from '../../../../api/authors/authors/models/author.model';

export const UNFOLLOW_AUTHOR = createAction('[AUTHORS] Unfollow author', props<{ payload: { author: Author, userId: number } }>());
export const UNFOLLOW_AUTHOR_SUCCESS = createAction('[AUTHORS] Unfollow author success');
export const UNFOLLOW_AUTHOR_FALIURE = createAction('[AUTHORS] Unfollow author faliure', props<{ payload: { author: Author, userId: number, model: ApiError } }>());
