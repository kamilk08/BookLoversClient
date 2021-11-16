import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { UUID } from "angular2-uuid";
import { of } from "rxjs";
import { map, withLatestFrom } from "rxjs/operators";
import { ApiModule } from "src/app/modules/api/api.module";
import { BookBasics, BookPublisher } from "src/app/modules/api/books/models";
import { Book } from "src/app/modules/api/books/models/book.model";
import { BrowseApi } from "src/app/modules/api/browse/browse.api";
import { BrowseCriteriaDetails } from "src/app/modules/api/browse/models/browse-criteria-details.model";
import { BrowsePagination } from "src/app/modules/api/browse/models/browse-criteria-pagination.model";
import { BrowseCriteria } from "src/app/modules/api/browse/models/browse-criteria.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ALL_SUBCATEGORIES } from "src/app/modules/books/common/categories";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { PageResult } from "src/app/modules/shared/common/page-result";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { browseModuleReducer } from "..";
import { BrowsePageEffects } from "../browse-page.effects";
import { BrowseEffects } from "../browse.effects";
import { BrowseFacade } from "../browse.facade";

describe('BROWSE_FACADE', () => {

  let api: BrowseApi;
  let facade: BrowseFacade;

  let book = new Book(new BookBasics('title', '12345', ALL_SUBCATEGORIES[0]),
    [], new BookPublisher(1, UUID.UUID(), new Date()));

  let pageResult: PageResult = {
    items: [book],
    page: 0,
    pagesCount: 1,
    totalItems: 1
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('browse', browseModuleReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([BrowseEffects, BrowsePageEffects])
      ],
      providers: [
        BrowseEffects,
        BrowsePageEffects,
        BrowseFacade,
        ApiErrorAdapter,
        ErrorActions,
        MesssagesFacade,
        ErrorsFacade
      ]
    });

    api = TestBed.get(BrowseApi);
    facade = TestBed.get(BrowseFacade);
  });

  describe('BROWSE_BOOKS', () => {
    it('should dispatch START_BROWSING action and then pageResult$ and browseCriteria$ should emit new values', async (done) => {

      let stream: any = {
        pageResult: pageResult,
        books: [book]
      }

      spyOn(api, 'searchBooks').and.returnValue(of(stream));

      const criteria = new BrowseCriteria('title', [ALL_SUBCATEGORIES[0].id], new BrowseCriteriaDetails('author', '12345', new Date(), new Date()),
        BrowsePagination.defaultPagination());

      facade.browseBooks(criteria);

      const subscription = facade.pageResult$
        .subscribe(val => {
          expect(val).toEqual(stream.pageResult);
          done();
        });

      subscription.unsubscribe();

    })

  });

  describe('CHANGE_PAGE', () => {

    it('should dispatch CHANGE_PAGE action and pageResult$ should emit new value', async (done) => {

      pageResult.page = pageResult.page + 1;

      let stream: any = {
        pageResult: pageResult,
        books: [book]
      }

      spyOn(api, 'searchBooks').and.returnValue(of(stream));

      facade.changePage(pageResult.page);

      facade.pageResult$.subscribe(val => {
        expect(val.page).toEqual(pageResult.page);
        done();
      })

    })

  });

  describe('ADD_CATEGORY', () => {
    it('should dispatch ADD_CATEGORY action and selectedCategories$ should emit new value', async (done) => {

      facade.removeCategory(ALL_SUBCATEGORIES[0].id);

      facade.selectCategory(ALL_SUBCATEGORIES[0], 1);

      const subscription = facade.selectedCategories$
        .subscribe(val => {
          expect(val.length).toEqual(1);
          expect(val.indexOf(ALL_SUBCATEGORIES[0].id)).not.toBe(-1);
          done();
        });

      subscription.unsubscribe();
    });
  });

  describe('REMOVE_CATEGORY', () => {
    it('should dispatch REMOVE_CATEGORY action and selectedCategories$ should emit new value', () => {

      facade.selectCategory(ALL_SUBCATEGORIES[0], 1);

      facade.removeCategory(ALL_SUBCATEGORIES[0].id);

      const subscription = facade.selectedCategories$
        .subscribe(val => {
          expect(val.length).toEqual(0);
          expect(val.indexOf(ALL_SUBCATEGORIES[0].id)).toBe(-1);
        })

      subscription.unsubscribe();

    });
  });

});
