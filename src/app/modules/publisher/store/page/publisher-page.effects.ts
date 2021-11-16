import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, tap, withLatestFrom } from "rxjs/operators";
import { StatisticsFacade } from "src/app/modules/classification/statistics/store/statistics.facade";
import { DEFAULT_ITEMS_COUNT, DEFAULT_PAGE } from "src/app/modules/shared/common/query";
import { PUBLISHER_BOOKS_PAGE_QUERY } from "../../models/publisher-books-page.query";
import { PublisherFacade } from "../publishers/publisher.facade";
import * as fromActions from './publisher-page.actions';
import { PublisherPageFacade } from "./publisher-page.facade";

@Injectable()
export class PublisherPageEffects {

  constructor(
    private readonly actions$: Actions,
    private readonly facade: PublisherPageFacade,
    private readonly publisherFacade: PublisherFacade,
    private readonly statisticsFacade: StatisticsFacade,
  ) {
  }

  setPublisherId$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_PAGE_PUBLISHER),
      map(action => action.payload.id),
      tap(id => this.publisherFacade.selectPublisherById(id)),
      tap(id => this.publisherFacade.selectPublisherBooks(PUBLISHER_BOOKS_PAGE_QUERY(id))),
      tap(id => this.statisticsFacade.selectPublisherStatistics(id))
    ), { dispatch: false })

  changePage$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.NEXT_PUBLISHER_BOOKS_PAGE),
      map(action => action.payload.page),
      withLatestFrom(this.facade.searchPhrase$, this.facade.publisherId$, this.facade.sortOrder$, this.facade.sortType$),
      map(stream => { return { page: stream[0], publisherId: stream[2], descending: stream[3], sortType: stream[4], phrase: stream[1] } }),
      map(stream => PUBLISHER_BOOKS_PAGE_QUERY(stream.publisherId, DEFAULT_ITEMS_COUNT, stream.page, stream.descending, stream.sortType, stream.phrase)),
      tap((query) => this.publisherFacade.selectPublisherBooks(query))
    ), { dispatch: false })


  setSearchPhrase$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SET_SEARCH_PHRASE),
      map(action => action.payload.phrase),
      withLatestFrom(this.facade.publisherId$, this.facade.sortOrder$, this.facade.sortType$),
      map(stream => ({ phrase: stream[0], publisherId: stream[1], descending: stream[2], sortType: stream[3] })),
      map(stream => PUBLISHER_BOOKS_PAGE_QUERY(stream.publisherId, DEFAULT_ITEMS_COUNT, DEFAULT_PAGE, stream.descending, stream.sortType, stream.phrase)),
      tap(query => this.publisherFacade.selectPublisherBooks(query))
    ), { dispatch: false })

  changeSortOrder$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.CHANGE_PUBLISHER_BOOKS_ORDER),
      map(action => action.payload.descending),
      withLatestFrom(this.facade.sortType$, this.facade.publisherId$, this.facade.searchPhrase$),
      map(stream => {
        return {
          descending: stream[0], sortType: stream[1], publisherId: stream[2],
          phrase: stream[3]
        }
      }),
      map(stream => PUBLISHER_BOOKS_PAGE_QUERY(stream.publisherId, DEFAULT_ITEMS_COUNT, DEFAULT_PAGE, stream.descending, stream.sortType, stream.phrase)),
      tap(query => this.publisherFacade.selectPublisherBooks(query))
    ), { dispatch: false });

  changeSortType$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.CHANGE_PUBLISHER_BOOKS_SORT_TYPE),
      map(action => action.payload.sortType),
      withLatestFrom(this.facade.sortOrder$, this.facade.publisherId$, this.facade.searchPhrase$),
      map(stream => { return { descending: stream[1], sortType: stream[0], publisherId: stream[2], phrase: stream[3] } }),
      map(stream => PUBLISHER_BOOKS_PAGE_QUERY(stream.publisherId, DEFAULT_ITEMS_COUNT, DEFAULT_PAGE, stream.descending, stream.sortType, stream.phrase)),
      tap(query => this.publisherFacade.selectPublisherBooks(query))
    ), { dispatch: false })

}
