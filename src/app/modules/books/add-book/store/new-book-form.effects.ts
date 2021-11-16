import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { BookPublisherCycle } from "../../../api/books/models";
import { BookBuilder } from "../../../api/books/models/book-builder";
import { ADD_BOOK } from "./process-book.actions";
import * as fromActions from './new-book-form.actions';
import { BookFormExtensions } from "./new-book-form.extensions";
import { AddBookFacade } from "./add-book.facade";
import { AddBookPicture } from "../../../api/books/add/models/add-book-picture.interface";
import { AddNewBook } from "../../../api/books/add/models/add-book.model";
import { AddTicketModel } from "src/app/modules/api/tickets/models/add-ticket.model";
import { TicketConcern } from "src/app/modules/api/tickets/models/ticket-concern.model";
import { TicketsFacade } from "src/app/modules/tickets/store/tickets.facade";
import { AuthService } from "src/app/modules/auth/services/auth.service";

@Injectable()
export class NewBookFormEffects {

  constructor(private readonly actions$: Actions,
    private readonly addBookFacade: AddBookFacade,
    private readonly ticketsFacade: TicketsFacade,
    private readonly authService: AuthService) {

  }

  submitForm$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SUBMIT_BOOK_FORM),
      map(action => action.payload.form.valid),
      switchMap((valid) => [valid ? fromActions.BOOK_FORM_VALID() : fromActions.BOOK_FORM_INVALID()])
    ));

  formValid$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.BOOK_FORM_VALID),
      withLatestFrom(this.addBookFacade.newBookForm$),
      map(stream => {
        return { isLibrarian: this.authService.isLibrarian, form: stream[1] }
      }),
      switchMap((stream) => [
        stream.isLibrarian ?
          ADD_BOOK({ payload: { book: this.mapFormToBook(stream.form), cover: this.getCoverFromForm(stream.form) } })
          : fromActions.MOVE_BOOK_DATA_TO_TICKET_MODULE({ payload: { model: new AddNewBook(this.mapFormToBook(stream.form), this.getCoverFromForm(stream.form)) } })
      ])
    ));

  moveBookDataToTicketModule$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.MOVE_BOOK_DATA_TO_TICKET_MODULE),
      map(action => this.mapToTicket(action.payload.model)),
      tap((model) => this.ticketsFacade.createTicket(model))
    ), { dispatch: false });

  private mapToTicket(model: AddNewBook) {
    const ticketObject = { guid: model.bookWriteModel.bookGuid, data: JSON.stringify(model) };
    const ticketAddons = {
      title: `${model.bookWriteModel.basics.title} book ticket`,
      description: 'User is trying to create a new book',
      concern: TicketConcern.book().value
    }

    const ticket: AddTicketModel = new AddTicketModel(ticketObject, ticketAddons);
    return ticket;
  }

  private mapFormToBook(form: FormGroup) {
    let builder = new BookBuilder();
    const basics = BookFormExtensions.bookBasics(form);
    const publisher = BookFormExtensions.bookPublisher(form);
    const authors = BookFormExtensions.bookAuthors(form);

    const book = builder.initialize(basics, authors, publisher)
      .withCover(BookFormExtensions.bookCover(form))
      .withCycles(BookFormExtensions.bookCycles(form).map(s => new BookPublisherCycle(s.identification.id, s.identification.guid)))
      .withDescritpion(BookFormExtensions.bookDescription(form))
      .withDetails(BookFormExtensions.bookDetails(form))
      .withSeries(BookFormExtensions.bookSeries(form))
      .withAddedBy(this.authService.userId, this.authService.userGuid)
      .withHashTags(form.get('hashTags').value)
      .getBook();

    return book;
  }

  private getCoverFromForm(form: FormGroup) {
    const cover = BookFormExtensions.coverFile(form);
    const coverFileName = BookFormExtensions.coverFileName(form);

    const addBookPicture: AddBookPicture = {
      cover: cover,
      fileName: coverFileName
    };
    return addBookPicture;
  }
}
