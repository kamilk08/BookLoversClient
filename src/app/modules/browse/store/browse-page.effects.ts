import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { DEFAULT_PAGE } from "../../shared/common/query";
import * as fromActions from './browse-page.actions';
import { BrowseFacade } from "./browse.facade";

@Injectable()
export class BrowsePageEffects {

  constructor(
    private readonly actions$: Actions,
    private readonly facade: BrowseFacade) {
  }

  selectCategory$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_CATEGORY),
      withLatestFrom(this.facade.selectedCategories$),
      map(stream => { return { id: stream[0].payload.subCategory.id, categories: stream[1] } }),
      map(stream => { return { id: stream.id, flag: stream.categories.some(s => s === stream.id) } }),
      switchMap((stream) => [stream.flag ?
        fromActions.REMOVE_CATEGORY({ payload: { id: stream.id } }) :
        fromActions.ADD_CATEGORY({ payload: { id: stream.id } })])
    ));

  changePage$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.CHANGE_PAGE),
      switchMap(action => this.facade.browseCriteria$(action.payload.page)),
      tap(model => this.facade.browseBooks(model))
    ), { dispatch: false })


  startSearch$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.START_SEARCH),
      switchMap(() => this.facade.browseCriteria$(DEFAULT_PAGE)),
      tap(model => this.facade.browseBooks(model))
    ), { dispatch: false });


  addOrRemoveCategory$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_CATEGORY),
      switchMap(() => this.facade.browseCriteria$(DEFAULT_PAGE)),
      tap(model => this.facade.browseBooks(model))
    ), { dispatch: false });


}
