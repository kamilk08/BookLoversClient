import { createAction, props } from '@ngrx/store'; import { ApiError } from 'src/app/modules/api/api-error.model';
import { PageResult } from 'src/app/modules/shared/common/page-result';
import { OrderedQuery, Query } from 'src/app/modules/shared/common/query';
import { Quote } from '../../../api/quotes/models/quote.model';

export const SELECT_BOOK_QUOTES_PAGE = createAction('[QUOTES] Select book quotes page', props<{ payload: { bookId: number, query: OrderedQuery } }>());
export const SET_BOOK_QUOTES_PAGE_SUCCESS = createAction('[QUOTES] Set book quotes page success');
export const SET_BOOK_QUOTES_PAGE = createAction('[QUOTES] Set books quotes page', props<{ payload: { quotes: Quote[], pageResult: PageResult } }>());
export const SELECT_AUTHOR_QUOTES_PAGE = createAction('[QUOTES] Select author quotes page', props<{ payload: { authorId: number, query: OrderedQuery } }>());
export const SET_AUTHOR_QUOTES_PAGE_SUCCESS = createAction('[QUOTES] Set author quotes page success');
export const SET_AUTHOR_QUOTES_PAGE = createAction('[QUOTES] Set author quotes page', props<{ payload: { quotes: Quote[], pageResult: PageResult } }>());
export const SELECT_READER_QUOTES_PAGE = createAction('[QUOTES] Select reader quotes page', props<{ payload: { readerId: number, query: OrderedQuery } }>());
export const SET_READER_QUOTES_PAGE = createAction('[QUOTES] Set reader quotes page', props<{ payload: { quotes: Quote[], pageResult: PageResult } }>());

export const SET_QUOTES_PAGE_FALIURE = createAction('[QUOTES] Set quotes page faliure', props<{ payload: { model: ApiError } }>());
