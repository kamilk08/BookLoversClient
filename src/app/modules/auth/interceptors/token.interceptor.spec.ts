import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { SeriesApi } from '../../api/series/series.api';
import { TokenInterceptor } from './token.interceptor';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { GET_SERIES_BY_BOOK, GET_SERIES_BY_ID } from '../../api/series/series.urls';
import { SeriesAdapter } from '../../api/series/series.adapter';
import { BookAdapter } from '../../api/books/book.adapter';
import { CookiesService } from '../services/cookies.service';
import { TokenService } from '../services/token.service';

describe('Token interceptor', () => {
  let tokenService: TokenService;
  let seriesApi: SeriesApi
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TokenService, SeriesApi, CookiesService,
        SeriesAdapter, BookAdapter,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true
        }
      ]
    });
    tokenService = TestBed.get(TokenService);
    seriesApi = TestBed.get(SeriesApi);
    httpMock = TestBed.get(HttpTestingController);
  });

  describe('When new request is submited and token is present', () => {
    const seriesId = 1;
    const token = {
      access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      refresh_token: '',
      token_type: 'JWT',
      expires_in: 1516239022
    };


    it('should add an Authorization header', () => {
      spyOn(tokenService, 'getRawToken').and.returnValue(token);

      seriesApi.getSeriesById(seriesId).toPromise()
        .then(response => {
          expect(response).toBeTruthy();
        })

      const httpRequest = httpMock.expectOne(GET_SERIES_BY_ID(seriesId));
      expect(httpRequest.request.headers.has('Authorization')).toBeTruthy();
    });

    it('should match given token',()=>{
      spyOn(tokenService, 'getRawToken').and.returnValue(token);

      seriesApi.getSeriesById(seriesId).toPromise()
        .then(response => {
          expect(response).toBeTruthy();
        })

      const httpRequest = httpMock.expectOne(GET_SERIES_BY_ID(seriesId));
      const tokenInHeader = httpRequest.request.headers.get('Authorization');
      expect(tokenInHeader).toBe(`Bearer ${token.access_token}`);
    })
  });

  describe('When new request is submited and token is not present', () => {
    it('Should not add authorization header', () => {
      const bookId = 1;
      spyOn(tokenService, 'getRawToken').and.returnValue(null);

      const subscription = seriesApi.getSeriesByBook(bookId).subscribe(response => expect(response).toBeTruthy());

      const httpRequest = httpMock.expectOne(GET_SERIES_BY_BOOK(bookId));
      expect(httpRequest.request.headers.has('Authorization')).toBeFalsy();

      subscription.unsubscribe();
    })
  })
})
