import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, tap, takeUntil, switchMap, delay } from 'rxjs/operators';
import { DEFAULT_QUERY, SEARCH_QUERY } from 'src/app/modules/shared/common/query';
import { Subject } from 'rxjs';
import { ModalService } from 'src/app/modules/shared/services/modal.service';
import { AuthorFacade } from 'src/app/modules/authors/store/authors/author.facade';
import { PublisherCycleFacade } from '../../../publisher-cycle/store/publisher-cycles/publisher-cycle.facade';
import { SeriesFacade } from '../../../series/store/series/series.facade';
import { BookFacade } from '../../store/book.facade';
import { AddAuthorComponent } from 'src/app/modules/authors/add-author/index/add-author.component';
import { EditBookFacade } from '../store/edit-book.facade';
import { Book, BookHashTag, Language } from '../../../api/books/models';
import { noNullOrUndefined } from 'src/app/modules/shared/common/operator-extensions';
import { CoverType } from '../../../api/books/models/cover-type';
import { SubCategory } from '../../../api/books/models/sub-category.model';
import { SelectedImage } from 'src/app/modules/shared/models/selected-image';
import { ToggleOptions } from '../../common/book-page-sections';
import { FormGroup } from '@angular/forms';
import { PublisherFacade } from 'src/app/modules/publisher/store/publishers/publisher.facade';
import { SearchEvent } from 'src/app/modules/shared/common/search.event';
import { FICTION_SUBCATEGORIES, NON_FICTION_SUBCATEGORIES } from '../../common/categories';
import { COVER_TYPES } from '../../common/cover-types';
import { BOOK_LANGUAGES } from '../../common/languages';
import { AddPublisherCycleModalComponent } from '../../common/components/add-publisher-cycle-modal/add-publisher-cycle-modal.component';
import { AddPublisherModalComponent } from '../../common/components/add-publisher-modal/add-publisher-modal.component';
import { AddSeriesModalComponent } from '../../common/components/add-series-modal/add-series-modal.component';
import { DEFAULT_DELAY } from 'src/app/modules/shared/common/constants';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditBookComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();

  public bookId: number;

  public readonly toggleOptions = ToggleOptions;
  public readonly fictionSubCategories: SubCategory[] = FICTION_SUBCATEGORIES;
  public readonly nonFitctionSubCategories: SubCategory[] = NON_FICTION_SUBCATEGORIES;
  public readonly bookLanguages: Language[] = BOOK_LANGUAGES;
  public readonly coverTypes: CoverType[] = COVER_TYPES;


  constructor(
    public readonly bookFacade: BookFacade,
    public readonly authorFacade: AuthorFacade,
    public readonly publisherFacade: PublisherFacade,
    public readonly cycleFacade: PublisherCycleFacade,
    public readonly seriesFacade: SeriesFacade,
    public readonly editBookFacade: EditBookFacade,
    public readonly modalService: ModalService,
    public readonly activatedRoute: ActivatedRoute
  ) { }


  ngOnInit() {
    this.activatedRoute.paramMap
      .pipe(
        tap((paramMap) => this.bookId = +paramMap.get('id')),
        tap(() => this.bookFacade.selectBook(this.bookId)),
        switchMap(() => this.bookFacade.bookById$(this.bookId)),
        filter(noNullOrUndefined()),
        tap((book: Book) => this.authorFacade.selectMultipleAuthorsById(book.authors.map(s => s.authorId))),
        tap((book: Book) => this.publisherFacade.selectPublisherById(book.publisher.publisherId)),
        tap((book: Book) => {
          if (book.hasSeries()) this.seriesFacade.selectSingleById(book.series.seriesId);
        }),
        tap(book => this.cycleFacade.selectMultiple(book.publisherCycles.map(s => s.id), DEFAULT_QUERY())),
        delay(DEFAULT_DELAY),
        filter(noNullOrUndefined()),
        tap((book: Book) => this.editBookFacade.setBookToEdit(book)),
        takeUntil(this.unsubscribe$)
      ).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onAuthorSearch(event: SearchEvent) {
    this.authorFacade.findAuthor(SEARCH_QUERY(event.phrase));
  }

  onPublisherSearch(event: SearchEvent) {
    this.publisherFacade.findPublisher(SEARCH_QUERY(event.phrase));
  }

  onSeriesSearch(event: SearchEvent) {
    this.seriesFacade.findSeries(SEARCH_QUERY(event.phrase));
  }

  onPublisherCycleSearch(event: SearchEvent) {
    this.cycleFacade.findPublisherCycle(SEARCH_QUERY(event.phrase));
  }

  addNewAuthor() {
    this.modalService
      .withTitle('Add new author')
      .withWidth('50rem')
      .withContent(AddAuthorComponent).openModal();
  }

  addNewPublisher() {
    this.modalService.withTitle('Add new publisher')
      .withContent(AddPublisherModalComponent)
      .withWidth("32rem")
      .withFooter(null).openModal();
  }

  addNewSeries() {
    this.modalService.withTitle('Add new series')
      .withWidth("32rem")
      .withContent(AddSeriesModalComponent).openModal();
  }

  addNewPublisherCycle() {
    this.modalService.withTitle('Add new publisher cycle')
      .withWidth("32rem")
      .withContent(AddPublisherCycleModalComponent).openModal();
  }

  public clear() {
    this.editBookFacade.resetForm();
  }

  public submitForm(form: FormGroup) {
    this.editBookFacade.submitForm(form);
  }

  public onCoverChange(cover: SelectedImage) {
    this.editBookFacade.changeCover(cover);
  }

  public onNewHashTag(hashTag: BookHashTag) {
    this.editBookFacade.addHashTag(hashTag);
  }

  public onRemoveHashTag(hashTag: BookHashTag) {
    this.editBookFacade.removeHashTag(hashTag);
  }

  public onBasicsSectionExpand() {
    this.editBookFacade.toggleSection(this.toggleOptions.basics);
  }

  public onDescripionSectionExpand() {
    this.editBookFacade.toggleSection(this.toggleOptions.description);
  }

  public onSeriesSectionExpand() {
    this.editBookFacade.toggleSection(this.toggleOptions.series);
  }

  public onDetailsSectionExpand() {
    this.editBookFacade.toggleSection(this.toggleOptions.details);
  }

  public onCoverSectionExpand() {
    this.editBookFacade.toggleSection(this.toggleOptions.cover);
  }

  getCycles(book) {
    if (book)
      return book.publisherCycles.map(s => s.id);

    return [];
  }

  getBookAuhtors(book) {
    if (book)
      return book.authors.map(s => s.authorId);

    return [];
  }
}
