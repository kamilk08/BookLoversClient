import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UUID } from 'angular2-uuid';
import { NzModalRef, NzModalService, NzSelectComponent } from 'ng-zorro-antd';
import { Book, BookBasics, BookPublisher, BookAuthor, BookCover, BookDescription, BookSeries } from 'src/app/modules/api/books/models';
import { CoverType } from 'src/app/modules/api/books/models/cover-type';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { CookiesService } from 'src/app/modules/auth/services/cookies.service';
import { TokenService } from 'src/app/modules/auth/services/token.service';
import { ALL_SUBCATEGORIES } from 'src/app/modules/books/common/categories';
import { RatingsOverviewFacade } from 'src/app/modules/classification/ratings-overview/store/ratings-overview.facade';
import { RemovableTagComponent } from 'src/app/modules/shared/components/hash-tags/removable-tag/removable-tag.component';
import { RemoveTagChange } from 'src/app/modules/shared/components/hash-tags/removable-tag/remove-tag.event';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ReviewsFacade } from 'src/app/modules/users/reviews/store/reviews/reviews.facade';
import { Shelf, Bookcase } from '../../../models';
import { CUSTOM_SHELF } from '../../../models/shelf-categories';
import { AddBookToShelfFacade } from '../../add-book-to-shelf/store/add-book-to-shelf.facade';
import { RemoveBookcaseBookFacade } from '../../remove-book/store/remove-bookcase-book.facade';
import { bookcasePreviewReducer, BookcasePreviewState } from '../../store';
import { BookcasePreviewEffects } from '../../store/bookcase-preview.effects';
import { BookcasePreviewFacade } from '../../store/bookcase-preview.facade';
import { ReadedShelfEffects } from '../../store/readed-shelf/readed-shelf.effects';

import { AddToReadedShelfComponent } from './add-to-readed-shelf.component';

describe('AddToReadedShelfComponent', () => {
  let component: AddToReadedShelfComponent;
  let fixture: ComponentFixture<AddToReadedShelfComponent>;

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

  let shelfTag = { tagText: shelf.name, tagData: { linkedShelf: shelf } };
  let shelfTags = [shelfTag];

  let moduleInitialState: BookcasePreviewState = {
    manageBookcaseState: {
      bookcase: bookcase,
      bookId: undefined,
      currentShelfTags: shelfTags,
      availableShelves: [],
      selectedShelf: undefined,
      removedShelfTag: undefined,
      processing: false,
      error: undefined
    },
    readedShelfState: undefined
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, FormsModule, ReactiveFormsModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('bookcase-preview', bookcasePreviewReducer, { initialState: moduleInitialState }),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([ReadedShelfEffects, BookcasePreviewEffects]),
        RouterModule.forRoot([])
      ],
      providers: [
        {
          provide: NzModalRef,
          useFactory: (modalService: NzModalService) => modalService.create({
            nzClosable: false,
            nzContent: AddToReadedShelfComponent
          }),
          deps: [NzModalService]
        },
        BookcasePreviewFacade,
        AddBookToShelfFacade,
        RemoveBookcaseBookFacade,
        BookcasePreviewEffects,
        ReadedShelfEffects,
        ReviewsFacade,
        RatingsOverviewFacade,
        AuthService,
        TokenService,
        CookiesService
      ],
      declarations: [AddToReadedShelfComponent]
    })
      .overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [AddToReadedShelfComponent] } })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToReadedShelfComponent);
    component = fixture.componentInstance;
    component.book = book;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ON_SHELF_PICK', () => {
    it('when selectShelf from facadeObject was invoked then selectedShelf$ observable should emit new value and then addToBookcase method from addBookToShelfFacade should be invoked', () => {

      let spy = spyOn(component.addBookToShelfFacade, 'addToBookcase');

      const selectComponent = fixture.debugElement.query(By.directive(NzSelectComponent));

      selectComponent.triggerEventHandler('ngModelChange', shelf);

      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();
    });

  });

  describe('ON_TAG_REMOVE', () => {
    it('when selectShelfTag was invoked from facadeObject then removedShelfTag$ observable should emit new value and then removeFromShelf method from removeBookFacade object should be invoked', () => {

      let spy = spyOn(component.removeBookFacade, 'removeFromShelf');

      const shelfTagItem = fixture.debugElement.query(By.directive(RemovableTagComponent));

      let tag = new RemovableTagComponent();
      tag.tagData = shelfTag.tagData;
      tag.tagText = shelfTag.tagText;

      let event: RemoveTagChange = {
        tag: tag
      }

      shelfTagItem.triggerEventHandler('remove', event);

      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();

    });
  });

  describe('REVIEW_FORM', () => {
    it('when review is not present then required error should be visible', () => {

      component.facade.submitPreivewForm(undefined, undefined, undefined);

      fixture.detectChanges();

      const errorBox = fixture.debugElement.query(By.css('.comment__error'));

      expect(errorBox).not.toBeNull();
    });

    it('when review is not long enough then error should be visible', () => {

      const input: HTMLInputElement = fixture.debugElement.query(By.css('.comment__input')).nativeElement;
      input.value = 'ab';
      input.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      component.facade.submitPreivewForm(undefined, undefined, undefined);

      fixture.detectChanges();

      const errorBox = fixture.debugElement.query(By.css('.comment__error'));

      expect(errorBox).not.toBeNull();

    });
  });

});
