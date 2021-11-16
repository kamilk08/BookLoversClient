import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import { AddTicketModel } from "src/app/modules/api/tickets/models/add-ticket.model";
import { TicketConcern } from "src/app/modules/api/tickets/models/ticket-concern.model";
import { AuthService } from "src/app/modules/auth/services/auth.service";
import { SelectedImage } from "src/app/modules/shared/models/selected-image";
import { CREATE_TICKET } from "src/app/modules/tickets/store/add-ticket/add-ticket.actions";
import { AddAuthorModel } from "../../../../api/authors/add-author/models/add-author.model";
import { ADD_AUTHOR } from "../add-author-state/add-author.actions";
import { AddAuthorFacade } from "../add-author-state/add-author.facade";
import * as fromActions from './add-author-modal.actions';

@Injectable()
export class AddAuthorModalEffects {

  constructor(private readonly actions$: Actions,
    private readonly facade: AddAuthorFacade,
    private readonly authService: AuthService) {
  }

  submitAddAuthorForm$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SUBMIT_ADD_AUTHOR_FORM),
      map(action => action.payload.form),
      switchMap((form) => [form.valid ?
        fromActions.ADD_AUTHOR_FORM_VALID()
        : fromActions.ADD_AUTHOR_FORM_INVALID()])
    ));

  addAuthorFormValid$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_AUTHOR_FORM_VALID),
      withLatestFrom(this.facade.authorToAdd$(this.authService.userId), this.facade.authorImage$),
      map(stream => ({ author: stream[1], image: stream[2] })),
      map(stream => new AddAuthorModel(stream.author, {
        encodedImage: this.assignSelectedImage(stream.image),
        fileName: this.assignImageFileName(stream.image)
      }, this.authService.userGuid)),
      switchMap(model => [this.authService.isLibrarian ?
        ADD_AUTHOR({ payload: { model } })
        : fromActions.MOVE_AUTHOR_DATA_TO_TICKET_MODULE({ payload: { model } })])
    ));

  moveAuthorDataToTicketModule$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.MOVE_AUTHOR_DATA_TO_TICKET_MODULE),
      map(action => action.payload.model),
      map(model => this.mapAuthorModelToTicket(model)),
      switchMap((model) => [CREATE_TICKET({ payload: { model } })])
    ))

  private mapAuthorModelToTicket(model: AddAuthorModel) {
    const ticketObject = { guid: model.authorWriteModel.authorGuid, data: JSON.stringify(model) };
    const ticketAddons = {
      title: `${model.authorWriteModel.basics.firstName + model.authorWriteModel.basics.secondName} author ticket`,
      description: 'User is trying to create a new author.',
      concern: TicketConcern.author().value
    };
    return new AddTicketModel(ticketObject, ticketAddons);
  }

  private assignSelectedImage(selectedImage: SelectedImage) {
    return selectedImage === null ? null : selectedImage.encodedImage;
  }

  private assignImageFileName(selectedImage: SelectedImage) {
    return selectedImage === null ? null : selectedImage.fileName;
  }


}
