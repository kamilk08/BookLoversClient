import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { BookFormExtensions } from "../../add-book/store/new-book-form.extensions";
import { Book, BookPublisherCycle } from "../../../api/books/models";
import { EditBookPicture } from "../../../api/books/edit/models/edit-book-picture.interface";
import * as fromActions from './edit-book-form.actions';
import { EDIT_BOOK } from "./edit-book.actions";
import { EditBookFacade } from "./edit-book.facade";
import { PublisherCycle } from "src/app/modules/api/cycles/models/publisher-cycle.model";
import { PublisherCycleFacade } from "src/app/modules/publisher-cycle/store/publisher-cycles/publisher-cycle.facade";

@Injectable()
export class EditBookFormEffects {

  constructor(private readonly actions$: Actions,
    private readonly cycleFacade: PublisherCycleFacade,
    private readonly facade: EditBookFacade) {

  }

  submitEditForm$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SUBMIT_EDIT_BOOK_FORM),
      switchMap((action) => [action.payload.form.valid ? fromActions.EDIT_BOOK_FORM_VALID() : fromActions.EDIT_BOOK_FORM_INVALID()])
    ));

  editFormValid$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.EDIT_BOOK_FORM_VALID),
    withLatestFrom(this.facade.editForm$, this.facade.bookToEdit$),
    map(stream => {
      return { form: stream[1], book: stream[2] }
    }),
    tap((stream) => this.cyclesToAdd(stream.book, stream.form).forEach(cycle => this.cycleFacade.addCycleBook(cycle, stream.book))),
    tap((stream) => this.cyclesToRemove(stream.book, stream.form).forEach(cycle => this.cycleFacade.removeCycleBook(cycle, stream.book))),
    switchMap((stream) => [
      EDIT_BOOK({ payload: { book: this.editCurrentBook(stream.book, stream.form), cover: this.getCoverFromForm(stream.form) } }),
    ])
  ));

  editFormInValid$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.EDIT_BOOK_FORM_INVALID),
      switchMap(() => [fromActions.UPDATE_EDIT_BOOK_FORM_VALIDITY()])
    ));


  private editCurrentBook(book: Book, form: FormGroup) {
    book.basics = BookFormExtensions.bookBasics(form);
    book.publisher = BookFormExtensions.bookPublisher(form);
    book.authors = BookFormExtensions.bookAuthors(form)
    book.cover = BookFormExtensions.bookCover(form);
    book.description = BookFormExtensions.bookDescription(form);
    book.details = BookFormExtensions.bookDetails(form);
    book.hashTags = BookFormExtensions.bookHashTags(form);
    book.publisherCycles = BookFormExtensions.bookCycles(form)
    .map(s => new BookPublisherCycle(s.identification.id, s.identification.guid));
    book.series = BookFormExtensions.bookSeries(form);

    return book;
  }

  private getCoverFromForm(form: FormGroup) {
    const cover = BookFormExtensions.coverFile(form);
    const coverFileName = BookFormExtensions.coverFileName(form);

    const addBookPicture: EditBookPicture = {
      cover: cover,
      fileName: coverFileName
    };
    return addBookPicture;
  }

  public cyclesToAdd(book: Book, form: FormGroup): Array<PublisherCycle> {

    let bookCycles = BookFormExtensions.bookCycles(form)
    let toAdd = [];
    bookCycles.forEach(cycle => {
      if (!book.publisherCycles.find(p => p.id === cycle.identification.id))
        toAdd.push(cycle);
    });

    return toAdd;
  }

  public cyclesToRemove(book: Book, form: FormGroup): Array<PublisherCycle> {

    let bookCycles = BookFormExtensions.bookCycles(form);
    let toRemove = [];
    book.publisherCycles.forEach(cycle => {
      if (!bookCycles.find(p => p.identification.id === cycle.id))
        toRemove.push(cycle);
    });

    return toRemove;
  }
}
