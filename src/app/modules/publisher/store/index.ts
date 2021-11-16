import * as fromAddPublisher from './add-publisher/add-publisher.reducer';
import * as fromPublisher from './publishers/publisher.reducer';
import * as fromSearchPublisher from './search-publisher/search-publisher.reducer'
import * as fromPublisherWebPage from './page/publisher-page.reducer';
import * as fromPublisherBooksPagination from './pagination/publisher-books.reducer'
import { ActionReducerMap, combineReducers, Action, createFeatureSelector } from '@ngrx/store';

export interface PublishersModuleState {
  addPublisher: fromAddPublisher.AddPublisherState,
  publishers: fromPublisher.PublishersState,
  searchPublisher: fromSearchPublisher.SearchPublisherState,
  publisherWebPage: fromPublisherWebPage.PublisherPageState,
  publisherBooksPagination: fromPublisherBooksPagination.PublisherBooksState
}


const reducerMap: ActionReducerMap<PublishersModuleState> = {
  addPublisher: fromAddPublisher.addPublisherReducer,
  publishers: fromPublisher.publisherReducer,
  searchPublisher: fromSearchPublisher.searchPublisherReducer,
  publisherWebPage: fromPublisherWebPage.publisherPageReducer,
  publisherBooksPagination: fromPublisherBooksPagination.publisherBooksStateReducer
};

const reducer = combineReducers(reducerMap);

export function publishersReducer(state: PublishersModuleState, action: Action) {
  return reducer(state, action);
}

export const publishersModuleState = createFeatureSelector('publishers');
