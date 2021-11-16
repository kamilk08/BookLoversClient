import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UUID } from 'angular2-uuid';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Book, BookAuthor, BookBasics, BookCover, BookDescription, BookPublisher, BookSeries } from 'src/app/modules/api/books/models';
import { CoverType } from 'src/app/modules/api/books/models/cover-type';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { CookiesService } from 'src/app/modules/auth/services/cookies.service';
import { TokenService } from 'src/app/modules/auth/services/token.service';
import { ALL_SUBCATEGORIES } from 'src/app/modules/books/common/categories';
import { ModalService } from 'src/app/modules/shared/services/modal.service';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ReviewsPaginationFacade } from 'src/app/modules/users/reviews/store/reviews-pagination.facade';
import { Bookcase, Shelf } from '../../models';
import { CUSTOM_SHELF } from '../../models/shelf-categories';
import { AddBookToShelfFacade } from '../add-book-to-shelf/store/add-book-to-shelf.facade';
import { ChangeShelfFacade } from '../change-shelf/store/change-shelf.facade';
import { PreviewBookcaseShelfComponent } from '../components/preview-bookcase-shelf/preview-bookcase-shelf.component';
import { bookcasePreviewReducer, BookcasePreviewState } from '../store';
import { BookcasePreviewFacade } from '../store/bookcase-preview.facade';

import { PreviewBookcaseComponent } from './preview-bookcase.component';
import { PreviewBookcaseService } from './services/preview-bookcase.service';

describe('PreviewBookcaseComponent', () => {
  let component: PreviewBookcaseComponent;
  let fixture: ComponentFixture<PreviewBookcaseComponent>;

  let shelf: Shelf;
  let bookcase: Bookcase;
  let book: Book;

  book = new Book(new BookBasics('title', 'isbn', ALL_SUBCATEGORIES[0]), [], new BookPublisher(1, UUID.UUID(), new Date()));
  book.setBookId(1);
  book.addedBy = { addedByGuid: UUID.UUID(), addedById: 1, userName: 'username' };
  book.authors = [new BookAuthor(1, UUID.UUID())];
  book.cover = new BookCover(CoverType.hardCover().id, undefined, false);
  book.description = new BookDescription('content', 'source');
  book.series = new BookSeries(1, UUID.UUID(), 1);
  book.hashTags = [{ hashTagValue: '#hashTag' }];

  shelf = new Shelf(CUSTOM_SHELF.id, 'NEW_SHELF');
  shelf.setShelfId(2);
  shelf.identification.guid = UUID.UUID();

  bookcase = new Bookcase(1);
  bookcase.identification.id = 1;
  bookcase.identification.guid = UUID.UUID();

  bookcase.addShelf(shelf);

  let moduleInitialState: BookcasePreviewState = {
    manageBookcaseState: {
      bookcase: bookcase,
      bookId: undefined,
      currentShelfTags: new Array<{ tagText: string, tagData: { linkedShelf: Shelf } }>(),
      availableShelves: [],
      selectedShelf: undefined,
      removedShelfTag: undefined,
      processing: false,
      error: undefined
    },
    readedShelfState: undefined
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}),
      StoreModule.forFeature('bookcase-preview', bookcasePreviewReducer, { initialState: moduleInitialState }),
      EffectsModule.forRoot([]),
      RouterModule.forRoot([]),
        SharedModule, FormsModule, ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      declarations: [PreviewBookcaseComponent, PreviewBookcaseShelfComponent],
      providers: [PreviewBookcaseService, BookcasePreviewFacade,
        ChangeShelfFacade, AddBookToShelfFacade,
        ReviewsPaginationFacade,
        ModalService,
        AuthService,
        TokenService,
        CookiesService,
        {
          provide: NzModalRef,
          useFactory: (modalService: NzModalService) => modalService.create({
            nzClosable: false,
            nzContent: PreviewBookcaseComponent
          }),
          deps: [NzModalService]
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewBookcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('OPEN_SETTINGS', () => [

    it('should open settings modal', () => {
      let spy = spyOn(component.pageService.modalService, 'openModal');

      fixture.detectChanges();

      const settingsIcon: HTMLElement = fixture.debugElement.query(By.css('.preview-bookcase__icon')).nativeElement;

      settingsIcon.click();

      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();
    })

  ]);

  describe('PREVIEW_BOOKCASE_SHELF', () => {
    it('clicking preview shelf should result in emiting new value by addToShelf$ observable', () => {

      let spy = spyOn(component.pageService.addToShelf$, 'next');

      fixture.detectChanges();

      const shelf = fixture.debugElement.queryAll(By.directive(PreviewBookcaseShelfComponent))[0];

      shelf.triggerEventHandler('click', bookcase.getCoreShelfs()[0]);

      expect(spy).toHaveBeenCalled();
    });

  });

  describe('ADD_TO_SHELF$', () => {
    it('when addToShelf$ observable emits new value and selected shelf is of type READED then addToBookcase method from addBookFacade object should be invoked', () => {

      const spy = spyOn(component.pageService.addBookFacade, 'addToBookcase');

      component.pageService.addToShelf$
        .next({ shelf: bookcase.getCoreShelfs()[0], book })

      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();
    });

    it('when addToShelf$ observable emits new value and selcted shelf is of type WANT_TO_READ then addToBookcase from addBookFacade object should be invoked', () => {

      const spy = spyOn(component.pageService.addBookFacade, 'addToBookcase');

      component.pageService.addToShelf$
        .next({ shelf: bookcase.getCoreShelfs()[1], book })

      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();
    });

  });
});
