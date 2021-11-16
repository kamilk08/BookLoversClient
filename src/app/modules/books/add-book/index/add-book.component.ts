import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from 'src/app/modules/shared/services/modal.service';
import { AuthorFacade } from 'src/app/modules/authors/store/authors/author.facade';
import { SeriesFacade } from '../../../series/store/series/series.facade';
import { BookFacade } from '../../store/book.facade';
import { AddBookFacade } from '../store/add-book.facade';
import { SelectedImage } from 'src/app/modules/shared/models/selected-image';
import { AddAuthorComponent } from 'src/app/modules/authors/add-author/index/add-author.component';
import { Subject } from 'rxjs';
import { BookHashTag, Language } from '../../../api/books/models';
import { FormGroup } from '@angular/forms';
import { SubCategory } from '../../../api/books/models/sub-category.model';
import { CoverType } from '../../../api/books/models/cover-type';
import { ToggleOptions } from '../../common/book-page-sections';
import { PublisherCycleFacade } from 'src/app/modules/publisher-cycle/store/publisher-cycles/publisher-cycle.facade';
import { PublisherFacade } from 'src/app/modules/publisher/store/publishers/publisher.facade';
import { SEARCH_QUERY } from 'src/app/modules/shared/common/query';
import { SearchEvent } from 'src/app/modules/shared/common/search.event';
import { FICTION_SUBCATEGORIES, NON_FICTION_SUBCATEGORIES } from '../../common/categories';
import { COVER_TYPES } from '../../common/cover-types';
import { BOOK_LANGUAGES } from '../../common/languages';
import { AddPublisherCycleModalComponent } from '../../common/components/add-publisher-cycle-modal/add-publisher-cycle-modal.component';
import { AddPublisherModalComponent } from '../../common/components/add-publisher-modal/add-publisher-modal.component';
import { AddSeriesModalComponent } from '../../common/components/add-series-modal/add-series-modal.component';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit, OnDestroy {

  public readonly unsubscribe$: Subject<void> = new Subject<void>();
  public readonly toggleOptions = ToggleOptions;

  public readonly fictionSubCategories: SubCategory[] = FICTION_SUBCATEGORIES;
  public readonly nonFitctionSubCategories: SubCategory[] = NON_FICTION_SUBCATEGORIES;
  public readonly bookLanguages: Language[] = BOOK_LANGUAGES;
  public readonly coverTypes: CoverType[] = COVER_TYPES;

  constructor(
    public readonly modalService: ModalService,
    public readonly addBookFacade: AddBookFacade,
    public readonly authorFacade: AuthorFacade,
    public readonly publisherFacade: PublisherFacade,
    public readonly bookFacade: BookFacade,
    public readonly cycleFacade: PublisherCycleFacade,
    public readonly seriesFacade: SeriesFacade) { }

  ngOnInit() {
    this.addBookFacade.initializeForm();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onCoverChange(file: SelectedImage) {
    this.addBookFacade.changeCover(file);
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

  addBook(form: FormGroup) {
    this.addBookFacade.submitForm(form);
  }

  addHashTag(hashTag: BookHashTag) {
    this.addBookFacade.addHashTag(hashTag);
  }

  removeHashTag(hashTag: BookHashTag) {
    this.addBookFacade.removeHashTag(hashTag);
  }

  clear() {
    this.addBookFacade.resetForm();
  }

  addNewAuthor() {
    this.modalService.withTitle('Add author')
      .withContent(AddAuthorComponent)
      .withWidth('50rem')
      .withoutFooter()
      .openModal();
  }

  addNewPublisher() {
    this.modalService
      .withTitle('Add publisher')
      .withContent(AddPublisherModalComponent)
      .withWidth('32rem')
      .openModal();
  }

  addNewSeries() {
    this.modalService.withTitle('Add series')
      .withContent(AddSeriesModalComponent)
      .withWidth('32rem')
      .openModal();
  }

  addNewPublisherCycle() {
    this.modalService.withTitle('Add publisher cycle')
      .withContent(AddPublisherCycleModalComponent)
      .withWidth('32rem')
      .openModal()
  }

  public onBasicsSectionExpand() {
    this.addBookFacade.toggleSection(ToggleOptions.basics);
  }

  public onDescripionSectionExpand() {
    this.addBookFacade.toggleSection(ToggleOptions.description);
  }

  public onSeriesSectionExpand() {
    this.addBookFacade.toggleSection(ToggleOptions.series);
  }

  public onDetailsSectionExpand() {
    this.addBookFacade.toggleSection(ToggleOptions.details);
  }

  public onCoverSectionExpand() {
    this.addBookFacade.toggleSection(ToggleOptions.cover);
  }
}
