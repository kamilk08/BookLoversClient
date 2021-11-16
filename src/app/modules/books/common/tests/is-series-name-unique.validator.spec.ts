import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { of } from "rxjs";
import { BookAdapter } from "src/app/modules/api/books/book.adapter";
import { Series } from "src/app/modules/api/series/models/series.model";
import { SeriesAdapter } from "src/app/modules/api/series/series.adapter";
import { SeriesApi } from "src/app/modules/api/series/series.api";
import { isSeriesNameUnique } from "../is-series-name-unique.validator";

describe('isSeriesNameUnique', () => {

  let api: SeriesApi;
  let form: FormGroup
  let minLength = 3;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [SeriesApi, SeriesAdapter,BookAdapter]
    });

    api = TestBed.get(SeriesApi);
    form = new FormGroup({
      series: new FormControl(undefined, [Validators.required], [isSeriesNameUnique(api, minLength)])
    });
  })


  it('should not make an api call when input length is smaller than minLength', () => {

    let spy = spyOn(api, 'getSeriesByName');

    form.get('series').setValue('ab');
    form.updateValueAndValidity();

    expect(spy).not.toHaveBeenCalled();
  });

  it('should call an api and form should have seriesNotUnique error', async (done) => {

    let series = new Series('abcd');
    series.setSeriesId(1);

    let spy = spyOn(api, 'getSeriesByName')
      .and.returnValue(of(series));

    form.get('series').setValue('abcd');
    form.updateValueAndValidity();

    form.get('series')
      .statusChanges.subscribe(val => {
        let hasError = form.get('series').hasError('seriesNotUnique');

        expect(spy).toHaveBeenCalled();
        expect(hasError).toBeTruthy();
        done();
      });
  });

  it('should call na api and form should not have seriesNotUnique error', async (done) => {

    let spy = spyOn(api, 'getSeriesByName')
      .and.returnValue(of(undefined));

    form.get('series').setValue('abcd');
    form.updateValueAndValidity();

    form.get('series')
      .statusChanges.subscribe(val => {
        let hasError = form.get('series').hasError('seriesNotUnique');

        expect(spy).toHaveBeenCalled();
        expect(hasError).toBeFalsy();
        done();
      })
  })

})
