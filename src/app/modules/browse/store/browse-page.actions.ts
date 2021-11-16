import { createAction, props } from "@ngrx/store";
import { SubCategory } from "../../api/books/models/sub-category.model";

export const SELECT_CATEGORY = createAction('[BROWSE] Select category', props<{ payload: { subCategory: SubCategory, localIndex: number } }>());
export const ADD_CATEGORY = createAction('[BROWSE] Add category', props<{ payload: { id: number } }>());
export const REMOVE_CATEGORY = createAction('[BROWSE] Remove category', props<{ payload: { id: number } }>());

export const CHANGE_PAGE = createAction('[BROWSE] Change page', props<{ payload: { page: number } }>());
export const START_SEARCH = createAction('[BROWSE] Start search');
