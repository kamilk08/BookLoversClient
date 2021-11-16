import { Action, createReducer, on } from "@ngrx/store";
import { PromotionWaiter } from "src/app/modules/api/librarians/models/promotion-waiter.model";
import { fetchMany, replaceEntity } from "src/app/modules/shared/common/store-extensions";
import * as fromActions from './promotion-waiters.actions';

export interface PromotionWaitersState {
  entities: { [id: number]: PromotionWaiter },
  ids: number[]
}

const initialState: PromotionWaitersState = {
  entities: {},
  ids: []
};

const reducer = createReducer(initialState,
  on(fromActions.FETCH_PROMOTION_WAITERS, (state, action) => {
    const newState = fetchMany((item: PromotionWaiter) => item.identification.id, state, action.payload.entities);

    return { ...state, entities: newState.entities, ids: newState.ids }
  }),
  on(fromActions.UPDATE_PROMOTION_WAITER, (state, action) => {

    const entities = state.ids.map(id => state.entities[id]);
    const waiter = entities.find(f => f.readerGuid === action.payload.readerGuid);
    waiter.setStatus(action.payload.status);

    const newState = replaceEntity(state, waiter.identification.id, waiter);

    return newState;
  })
);

export function promotionWaitersReducer(state: PromotionWaitersState, action: Action) {
  return reducer(state, action);
}
