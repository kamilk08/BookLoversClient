import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing"
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { of } from "rxjs";
import { BookAdapter } from "src/app/modules/api/books/book.adapter";
import { BookApi } from "src/app/modules/api/books/book.api";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { PageResult } from "src/app/modules/shared/common/page-result";
import { DEFAULT_QUERY } from "src/app/modules/shared/common/query";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { booksStateReducer } from "../..";
import { BooksPaginationEffects } from "../books-pagination.effects";
import { BooksPaginationFacade } from "../books-pagination.facade";

describe('BOOKS_PAGINATION_FACADE', () => {

  let facade: BooksPaginationFacade;
  let api: BookApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('books', booksStateReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([BooksPaginationEffects])

      ],
      providers: [BooksPaginationFacade,
        BooksPaginationEffects,
        BookApi,
        BookAdapter,
        ApiErrorAdapter,
        ErrorActions,
        ErrorsFacade,
        MesssagesFacade
      ]
    });

    api = TestBed.get(BookApi);
    facade = TestBed.get(BooksPaginationFacade)
  });

  describe('selectBooksPage', () => {
    it('pageResul$ observable should emit new value when selectBooksPageMethod was invoked', async (done) => {

      const pageResult: PageResult = {
        page: 0,
        pagesCount: 0,
        items: [],
        totalItems: 10
      };
      const items = [];
      const apiResponse = {
        pageResult: pageResult,
        books: items
      }

      spyOn(api, 'selectBooksPage')
        .and.returnValue(of(apiResponse));

      facade.selectBooksPage(DEFAULT_QUERY());

      facade.pageResult$
        .pipe(
        ).subscribe(val => {
          expect(val.items).toBe(pageResult.items);
          expect(val.page).toBe(pageResult.page);
          expect(val.pagesCount).toBe(pageResult.pagesCount);
          expect(val.totalItems).toBe(pageResult.totalItems);

          done();
        })
    })
  })

})
