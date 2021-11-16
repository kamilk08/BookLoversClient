import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { delay, map, tap, withLatestFrom } from "rxjs/operators";
import { StatisticsFacade } from "src/app/modules/classification/statistics/store/statistics.facade";
import { DEFAULT_ITEMS_COUNT, DEFAULT_PAGE, DEFAULT_QUERY, SEARCH_QUERY } from "src/app/modules/shared/common/query";
import { SERIES_BOOKS_PAGE_QUERY } from "../../index/models/series-books-page.query";
import { SeriesFacade } from "../series/series.facade";
import * as fromActions from './series-web-page.actions';
import { SeriesWebPageFacade } from "./series-web-page.facade";

@Injectable()
export class SeriesWebPageEffects {

  constructor(private readonly actions$: Actions,
    private readonly pageFacade: SeriesWebPageFacade,
    private readonly seriesFacade: SeriesFacade,
    private readonly statisticsFacade: StatisticsFacade) {
  }

  setSeriesId$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SET_SERIES_ID),
      map(action => action.payload.seriesId),
      tap(id => this.seriesFacade.selectSingleById(id)),
      tap(id => this.seriesFacade.selectSeriesBooks(SERIES_BOOKS_PAGE_QUERY(id))),
      tap(id => this.statisticsFacade.selectSeriesStatistics(id))
    ), { dispatch: false });

  setSearchPhrase$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SET_SERIES_PAGE_SEARCH_PHRASE),
      withLatestFrom(this.pageFacade.seriesId$, this.pageFacade.descending$, this.pageFacade.sortType$),
      map(stream => ({ seriesId: stream[1], phrase: stream[0].payload.phrase, descending: stream[2], sortType: stream[3] })),
      map(stream => SERIES_BOOKS_PAGE_QUERY(stream.seriesId, DEFAULT_ITEMS_COUNT, DEFAULT_PAGE, stream.descending, stream.sortType, stream.phrase)),
      tap((query) => this.seriesFacade.selectSeriesBooks(query))
    ), { dispatch: false })

  nextSeriesBooksPage$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.NEXT_SERIES_BOOKS_PAGE),
      map(action => action.payload.page),
      withLatestFrom(this.pageFacade.seriesId$, this.pageFacade.searchPhrase$, this.pageFacade.sortType$, this.pageFacade.descending$),
      map(stream => ({ seriesId: stream[1], page: stream[0], phrase: stream[2], sortType: stream[3], descending: stream[4] })),
      map(stream => SERIES_BOOKS_PAGE_QUERY(stream.seriesId, DEFAULT_ITEMS_COUNT, stream.page, stream.descending, stream.sortType, stream.phrase)),
      tap(query => this.seriesFacade.selectSeriesBooks(query))
    ), { dispatch: false });

  changeSortOrder$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.CHNAGE_SERIES_PAGE_ORDER),
      map(action => action.payload.descending),
      withLatestFrom(this.pageFacade.sortType$, this.pageFacade.seriesId$, this.pageFacade.searchPhrase$, this.pageFacade.currentPage$),
      map(stream => ({ sortType: stream[1], descending: stream[0], seriesId: stream[2], phrase: stream[3], page: stream[4] })),
      map(stream => SERIES_BOOKS_PAGE_QUERY(stream.seriesId, DEFAULT_ITEMS_COUNT, stream.page, stream.descending, stream.sortType, stream.phrase)),
      tap(query => this.seriesFacade.selectSeriesBooks(query))
    ), { dispatch: false });

  changeSortType$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.CHANGE_SERIES_PAGE_SORT_TYPE),
      map(action => action.payload.sortType),
      withLatestFrom(this.pageFacade.descending$, this.pageFacade.seriesId$, this.pageFacade.searchPhrase$, this.pageFacade.currentPage$),
      map(stream => ({ descending: stream[1], sortType: stream[0], seriesId: stream[2], phrase: stream[3], page: stream[4] })),
      map(stream => SERIES_BOOKS_PAGE_QUERY(stream.seriesId, DEFAULT_ITEMS_COUNT, stream.page, stream.descending, stream.sortType, stream.phrase)),
      tap(query => this.seriesFacade.selectSeriesBooks(query))
    ), { dispatch: false })

}
