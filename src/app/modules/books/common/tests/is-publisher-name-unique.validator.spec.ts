import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { FormControl, FormGroup, Validators } from "@angular/forms"
import { of } from "rxjs";
import { BookAdapter } from "src/app/modules/api/books/book.adapter";
import { Publisher } from "src/app/modules/api/publishers/models/publisher.model";
import { PublisherAdapter } from "src/app/modules/api/publishers/publisher.adapter";
import { PublisherApi } from "src/app/modules/api/publishers/publisher.api";
import { isPublisherNameUnique } from "../is-publisher-name-unique.validator";

describe('isPublisherNameUnique', () => {

  let form: FormGroup;
  let api: PublisherApi;
  let minLength = 3;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        PublisherApi,
        PublisherAdapter,
        BookAdapter
      ]
    });

    api = TestBed.get(PublisherApi);
    form = new FormGroup({
      publisher: new FormControl(undefined, [Validators.required], [isPublisherNameUnique(api, minLength)])
    });
  })

  it('should not make an api call when input length is smaller than minLength', () => {

    let spy = spyOn(api, 'getPublisherByName');

    form.get('publisher').setValue('ab');
    form.updateValueAndValidity();

    expect(spy).not.toHaveBeenCalled();
  });

  it('should call an api and form should have publisherNameNotUnique error', async (done) => {

    let publisher = new Publisher('abcd');
    publisher.setPublisherId(1);

    let spy = spyOn(api, 'getPublisherByName')
      .and.returnValue(of(publisher));

    form.get('publisher').setValue('abcd');
    form.updateValueAndValidity();

    form.get('publisher')
      .statusChanges.subscribe(val => {
        let hasError = form.get('publisher').hasError('publisherNameNotUnique');

        expect(spy).toHaveBeenCalled();
        expect(hasError).toBeTruthy();
        done();
      });
  });

  it('should call na api and form should not have publisherNameNotUnique error', async (done) => {

    let spy = spyOn(api, 'getPublisherByName')
      .and.returnValue(of(undefined));

    form.get('publisher').setValue('abcd');
    form.updateValueAndValidity();

    form.get('publisher')
      .statusChanges.subscribe(val => {
        let hasError = form.get('publisher').hasError('publisherNameNotUnique');

        expect(spy).toHaveBeenCalled();
        expect(hasError).toBeFalsy();
        done();
      });
  })

})
