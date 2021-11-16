import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Author } from '../../../../api/authors/authors/models/author.model';

export const EDIT_AUTHOR = createAction('[EDIT_AUTHOR] Edit author', props<{ payload: { author: Author, image?: { encodedImage: string, fileName: string }, oldAuthor?: Author } }>());
export const EDIT_AUTHOR_FALIURE = createAction('[EDIT_AUTHOR] Edit author faliure', props<{ payload: { author: Author, model: ApiError } }>());
export const EDIT_AUTHOR_SUCCESS = createAction('[EDIT_AUTHOR] Edit author success');
