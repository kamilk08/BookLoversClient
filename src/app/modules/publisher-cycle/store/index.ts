import * as fromRemoveCycleBook from './remove-cycle-book/remove-cycle-book.reducer';
import * as fromAddPublisherCycle from './add-publisher-cycle/add-publisher-cycle.reducer';
import * as fromAddCycleBook from './add-cycle-book/add-cycle-book.reducer';
import * as fromPublisherCycles from './publisher-cycles/publisher-cycle.reducer';
import * as fromSearchPublisherCycle from './search-cycles/search-publisher-cycle.reducer';
import { ActionReducerMap, combineReducers, Action, createFeatureSelector } from '@ngrx/store';


export interface PublisherCyclesModuleState {
  addCycleBook: fromAddCycleBook.AddPublisherCycleBookState
  removeCycleBook: fromRemoveCycleBook.RemoveCycleBookState,
  addPublisherCycle: fromAddPublisherCycle.AddPublisherCycleState
  publisherCycles: fromPublisherCycles.PublisherCyclesState
  searchPublisherCycle: fromSearchPublisherCycle.SearchPublisherCycle
}

const reducersMap: ActionReducerMap<PublisherCyclesModuleState> = {
  removeCycleBook: fromRemoveCycleBook.removeCycleBookReducer,
  addCycleBook: fromAddCycleBook.addCycleBookReducer,
  addPublisherCycle: fromAddPublisherCycle.addPublisherCycleReducer,
  publisherCycles: fromPublisherCycles.publisherCycleReducer,
  searchPublisherCycle: fromSearchPublisherCycle.searchPublisherCycleReducer
};

const reducer = combineReducers(reducersMap);

export function publisherCyclesStateReducer(state: PublisherCyclesModuleState, action: Action) {
  return reducer(state, action);
}

export const publisherCyclesState = createFeatureSelector('publisher-cycles');
