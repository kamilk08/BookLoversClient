import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { EDIT_AUTHOR } from "../edit-author-state/edit-author.actions";
import { EditAuthorFacade } from "../edit-author.facade";
import * as fromActions from './edit-author-modal.actions';
import { AuthService } from "src/app/modules/auth/services/auth.service";

@Injectable()
export class EditAuthorModalEffects {

  constructor(private actions$: Actions,
    private readonly facade: EditAuthorFacade,
    private readonly authService: AuthService
  ) {
  }

  submitEditAuthorForm$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SUBMIT_EDIT_AUTHOR_FORM),
      map(action => action.payload.form),
      switchMap((form) => [form.valid ? fromActions.EDIT_AUTHOR_FORM_VALID()
        : fromActions.EDIT_AUTHOR_FORM_INVALID()])
    ));

  editAuthorFormValid$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.EDIT_AUTHOR_FORM_VALID),
      withLatestFrom(this.facade.editedAuthor$(this.authService.userId), this.facade.oldAuthor$, this.facade.authorImage$),
      map(stream => ({ editedAuthor: stream[1], oldAuthor: stream[2], selectedImage: stream[3] })),
      map(stream => EDIT_AUTHOR({ payload: { author: stream.editedAuthor, image: stream.selectedImage, oldAuthor: stream.oldAuthor } })),
      switchMap((action) => [action])
    ));

}
