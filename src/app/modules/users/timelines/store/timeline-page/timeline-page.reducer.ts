import { Action, createReducer, on } from "@ngrx/store";
import { DEFAULT_ITEMS_COUNT, DEFAULT_PAGE } from "src/app/modules/shared/common/query";
import * as fromActions from './timeline-page.actions';

export interface TimeLinePageState {
  timeLineId: number
  pageSize: number,
  currentPage: number
  showHiddenActivities: boolean,
}

const initialState: TimeLinePageState = {
  timeLineId: undefined,
  pageSize: DEFAULT_ITEMS_COUNT,
  currentPage: DEFAULT_PAGE,
  showHiddenActivities: false
};

const reducer = createReducer(initialState,
  on(fromActions.SET_TIMELINE_ID_ON_TIMELINE_PAGE, (state, action) => ({ ...state, timeLineId: action.payload.id })),
  on(fromActions.SET_PAGE_SIZE_ON_TIMELINE_PAGE, (state, action) => ({ ...state, pageSize: action.payload.pageSize })),
  on(fromActions.NEXT_TIMELINE_ACTIVITIES_PAGE, (state, action) => ({ ...state, currentPage: action.payload.page })),
  on(fromActions.EXPAND_TIMELINE_ACTIVITY, (state) => ({ ...state })),
  on(fromActions.INCLUDE_HIDDEN_ACTIVITIES, (state, action) => ({ ...state, showHiddenActivities: action.payload.flag, currentPage: 0 })),
  on(fromActions.EXPAND_NEW_BOOK_IN_BOOKCASE_ACTIVITY, (state) => ({ ...state })),
  on(fromActions.EXPAND_NEW_BOOK_REVIEW_ACTIVITY, (state) => ({ ...state })),
  on(fromActions.TOGGLE_ACTIVITY, (state) => ({ ...state }))
);

export function timeLinePageReducer(state: TimeLinePageState, action: Action) {
  return reducer(state, action);
}
