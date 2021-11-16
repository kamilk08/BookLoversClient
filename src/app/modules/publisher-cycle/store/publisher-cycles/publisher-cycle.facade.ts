import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SELECT_PUBLISHER_CYCLE, SELECT_MULTIPLE_PUBLISHER_CYCLES } from './publisher-cycle.actions';
import { PublisherCycle } from 'src/app/modules/api/cycles/models/publisher-cycle.model';
import { Book } from 'src/app/modules/api/books/models';
import { ADD_CYCLE_BOOK } from '../add-cycle-book/add-cycle-book.actions';
import { ADD_PUBLISHER_CYCLE } from '../add-publisher-cycle/add-publisher-cycle.actions';
import { Publisher } from 'src/app/modules/api/publishers/models/publisher.model';
import { REMOVE_CYCLE_BOOK } from '../remove-cycle-book/remove-cycle-book.actions';
import { START_FILTERING_PUBLISHER_CYCLES as FILTER_PUBLISHER_CYCLES } from '../search-cycles/search-publisher-cycle.actions';
import { Query } from 'src/app/modules/shared/common/query';

import * as fromSelectors from '../module.selectors';
import * as fromModule from '../index';
@Injectable()
export class PublisherCycleFacade {

  public readonly publisherCycleById$ = (publisherCycleId: number) => this.store.select(fromSelectors.publisherCycleById(publisherCycleId));
  public readonly multiplePublisherCycles$ = (publisherCycleIds: number[]) => this.store.select(fromSelectors.multiplePublisherCycles(publisherCycleIds));

  public readonly addedBookToCycle$ = this.store.select(fromSelectors.cycleWithNewBook);
  public readonly addedPublisherCycle$ = this.store.select(fromSelectors.createdPublisherCycle);
  public readonly processingNewCycle$ = this.store.select(fromSelectors.processing);

  public readonly cylceWithRemovedBook$ = this.store.select(fromSelectors.cycleWithRemovedBook);
  public readonly removedBook$ = this.store.select(fromSelectors.removedBookFromCycle);

  public readonly searchedPublisherCycles$ = this.store.select(fromSelectors.searchedPublisherCycles);
  public readonly isPublisherCycleFiltered$ = this.store.select(fromSelectors.isPublisherCycleFiltered);

  constructor(private store: Store<fromModule.PublisherCyclesModuleState>) { }

  selectSingle(cycleId: number) {
    this.store.dispatch(SELECT_PUBLISHER_CYCLE({ payload: { id: cycleId } }))
  }

  selectMultiple(cycleIds: number[], query: Query) {
    this.store.dispatch(SELECT_MULTIPLE_PUBLISHER_CYCLES({ payload: { ids: cycleIds, query } }))
  }

  addPublisherCycle(name: string, publisher: Publisher) {
    let publisherCycle = new PublisherCycle(name, { id: publisher.identification.id, guid: publisher.identification.guid });
    this.store.dispatch(ADD_PUBLISHER_CYCLE({ payload: { publisherCycle } }));
  }

  addCycleBook(cycle: PublisherCycle, book: Book) {
    this.store.dispatch(ADD_CYCLE_BOOK({ payload: { cycle, book } }));
  }

  removeCycleBook(cycle: PublisherCycle, book: Book) {
    this.store.dispatch(REMOVE_CYCLE_BOOK({ payload: { cycle, book } }));
  }

  findPublisherCycle(query: Query) {
    this.store.dispatch(FILTER_PUBLISHER_CYCLES({ payload: { query } }));
  }
}
