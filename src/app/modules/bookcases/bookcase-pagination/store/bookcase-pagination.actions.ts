import { createAction, props } from '@ngrx/store';
import { PageResult } from 'src/app/modules/shared/common/page-result';
import { BookcasePageQuery } from '../models/bookcase-page.query';

export const SELECT_BOOKCASE_PAGE = createAction('[BOOKCASE] SELECT_BOOKCASE_PAGE', props<{ payload: { bookcaseId: number, query: BookcasePageQuery } }>());
export const SET_BOOKCASE_PAGE = createAction('[BOOKCASE] SET_BOOKCASE_PAGE', props<{ payload: { pageResult: PageResult } }>());
export const BOOKCASE_PAGE_ACTION_FALIURE = createAction('[BOOKCASE] SET_BOOKCASE_PAGE_FALIURE', props<{ payload: { error: any } }>());
