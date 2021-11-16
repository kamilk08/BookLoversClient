import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SELECT_PUBLISHER, SELECT_PUBLISHER_BY_BOOK } from './publisher.actions';
import { START_FILTERING_PUBLISHERS } from '../search-publisher/search-publisher.actions';
import { ADD_PUBLISHER } from '../add-publisher/add-publisher.actions';
import { Publisher } from 'src/app/modules/api/publishers/models/publisher.model';
import { Query } from 'src/app/modules/shared/common/query';
import { filter, map } from 'rxjs/operators';
import { noNullOrUndefined } from 'src/app/modules/shared/common/operator-extensions';
import { PublisherBooksPageQuery } from '../../models/publisher-books-page.query';
import { SELECT_PUBLISHER_BOOKS } from '../pagination/publisher-books.actions';

import * as fromSelectors from '../module.selectors';
import * as fromModule from '../index';
@Injectable()
export class PublisherFacade {

  public readonly error$ = this.store.select(fromSelectors.error);

  public readonly publisherById$ = (publisherId: number) => this.store.select(fromSelectors.publisherById(publisherId));
  public readonly publisherByBookId$ = (bookId: number) => this.store.select(fromSelectors.publisherByBookId(bookId));

  public readonly bookPublisherName$ = (bookId: number) => this.publisherByBookId$(bookId).pipe(
    filter(noNullOrUndefined()),
    map((s: Publisher) => s.name))

  public readonly addedPublisher$ = this.store.select(fromSelectors.addedPublisher);
  public readonly searchedPublishers$ = this.store.select(fromSelectors.searchedPublishers);
  public readonly isFiltered$ = this.store.select(fromSelectors.isPublisherFiltered);

  public readonly publisherBooksPageResult$ = this.store.select(fromSelectors.pageResult);
  public readonly processingPublisherBooks$ = this.store.select(fromSelectors.processingPublisherBooks)
  public readonly publisherBooksIds$ = this.store.select(fromSelectors.publisherBooksIds);

  constructor(private store: Store<fromModule.PublishersModuleState>) { }

  selectPublisherById(id: number) {
    this.store.dispatch(SELECT_PUBLISHER({ payload: { id } }))
  }

  selectPublisherByBookId(bookId: number) {
    this.store.dispatch(SELECT_PUBLISHER_BY_BOOK({ payload: { bookId } }))
  }

  selectPublisherBooks(query: PublisherBooksPageQuery) {
    this.store.dispatch(SELECT_PUBLISHER_BOOKS({ payload: { query } }));
  }

  findPublisher(query: Query) {
    this.store.dispatch(START_FILTERING_PUBLISHERS({ payload: { query } }));
  }

  addPublisher(publisherName: string) {
    this.store.dispatch(ADD_PUBLISHER({ payload: { publisher: new Publisher(publisherName) } }))
  }

}
