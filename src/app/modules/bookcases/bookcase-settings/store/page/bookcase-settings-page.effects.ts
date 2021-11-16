import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { filter, map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { noNullOrUndefined } from "src/app/modules/shared/common/operator-extensions";
import { ModalService } from "src/app/modules/shared/services/modal.service";
import { AddCustomShelfComponent } from "../../../bookcase-preview/add-shelf/index/add-custom-shelf.component";
import { AddShelfFacade } from "../../../bookcase-preview/add-shelf/store/add-custom-shelf.facade";
import { EditShelfComponent } from "../../../bookcase-preview/edit-shelf/index/edit-shelf.component";
import { EditShelfDialogResult } from "../../../bookcase-preview/edit-shelf/index/services/edit-shelf-dialog.result";
import { EditShelfFacade } from "../../../bookcase-preview/edit-shelf/store/edit-shelf.facade";
import { RemoveCustomShelfResult } from "../../../bookcase-preview/remove-shelf/index/results/remove-custom-shelf.result";
import { RemoveCustomShelfComponent } from "../../../bookcase-preview/remove-shelf/index/remove-custom-shelf.component";
import { RemoveShelfFacade } from "../../../bookcase-preview/remove-shelf/store/remove-shelf.facade";
import { BookcasePreviewFacade } from "../../../bookcase-preview/store/bookcase-preview.facade";
import { Bookcase, Shelf } from "../../../models";
import { NewCustomShelfDialogResult } from "../../index/events/custom-shelf-dialog.result";
import { BookcaseSettings } from "../../models/bookcase-settings.model";

import * as fromActions from '../page/bookcase-settings-page.actions';
import { BookcaseSettingsFacade } from "../settings/bookcase-settings.facade";

@Injectable()
export class BookcaseSettingsPageEffects {

  constructor(private readonly actions$: Actions,
    private readonly previewFacade: BookcasePreviewFacade,
    private readonly settingsFacade: BookcaseSettingsFacade,
    private readonly modalService: ModalService,
    private readonly addShelfFacade: AddShelfFacade,
    private readonly editShelfFacade: EditShelfFacade,
    private readonly removeShelfFacade: RemoveShelfFacade
  ) {

  }

  submitSettingsForm$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SUBMIT_SETTINGS_FORM),
      withLatestFrom(this.previewFacade.loggedInUserBookcase$),
      map(stream => { return { bookcase: stream[1], form: stream[0].payload.form } }),
      filter((stream) => stream.form.valid),
      tap((stream) => {
        if (stream.form.dirty)
          this.settingsFacade.changeSettings(stream.bookcase, stream.form.value as BookcaseSettings)
      })
    ), { dispatch: false });

  openNewShelfModal$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.OPEN_NEW_SHELF_MODAL),
      withLatestFrom(this.previewFacade.loggedInUserBookcase$),
      map(stream => { return { bookcase: stream[1] } }),
      switchMap((stream) => this.openAddShelfModal(stream.bookcase).afterClose),
      filter(noNullOrUndefined()),
      switchMap((result: NewCustomShelfDialogResult) => [
        result.confirmed ?
          fromActions.NEW_CUSTOM_SHELF_CONFIRMED({ payload: { shelfName: result.shelfName } })
          : fromActions.NO_ACTION()])
    ));

  newCustomShelfConfirmed$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.NEW_CUSTOM_SHELF_CONFIRMED),
      withLatestFrom(this.previewFacade.loggedInUserBookcase$),
      map(stream => {
        return {
          bookcase: stream[1],
          shelfName: stream[0].payload.shelfName
        }
      }),
      tap(stream => this.addShelfFacade.addCustomShlef(stream.bookcase, stream.shelfName)),
    ), { dispatch: false });


  openEditShelfModal$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.OPEN_EDIT_SHELF_MODAL),
      map(action => action.payload.shelf),
      switchMap(shelf => this.openEditShelfModal(shelf).afterClose),
      withLatestFrom(this.previewFacade.loggedInUserBookcase$),
      map(stream => { return { bookcase: stream[1], result: stream[0] as EditShelfDialogResult } }),
      tap(stream => stream.result.confirmed ? this.editShelfFacade.editShelfName(stream.bookcase, stream.result.shelf, stream.result.shelfName) : false)
    ), { dispatch: false });

  openRemoveShelfModal$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.OPEN_REMOVE_SHELF_MODAL),
      map(action => action.payload.shelf),
      switchMap(shelf => this.openRemoveShelfModal(shelf).afterClose),
      withLatestFrom(this.previewFacade.loggedInUserBookcase$),
      map(stream => { return { bookcase: stream[1], result: stream[0] as RemoveCustomShelfResult } }),
      tap(stream => stream.result.confirmed ? this.removeShelfFacade.removeShelf(stream.bookcase, stream.result.shelf) : false)
    ), { dispatch: false });

  private openAddShelfModal(bookcase: Bookcase) {
    return this.modalService
      .withTitle('Add shelf')
      .withWidth('35rem')
      .withContent(AddCustomShelfComponent)
      .withParams({ bookcase: bookcase })
      .openModal();
  }

  private openEditShelfModal(shelf: Shelf) {
    return this.modalService
      .withTitle('Edit shelf')
      .withContent(EditShelfComponent)
      .withParams({ shelf: shelf })
      .openModal();
  }

  private openRemoveShelfModal(shelf: Shelf) {
    return this.modalService
      .withTitle('Remove shelf')
      .withContent(RemoveCustomShelfComponent)
      .withParams({ shelf: shelf })
      .openModal();
  }

}
