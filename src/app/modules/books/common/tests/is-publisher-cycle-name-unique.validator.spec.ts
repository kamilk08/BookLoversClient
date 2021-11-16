import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UUID } from "angular2-uuid";
import { of, timer } from "rxjs";
import { PublisherCycle } from "../../../api/cycles/models/publisher-cycle.model";
import { PublisherCycleAdapter } from "../../../api/cycles/publisher-cycle.adapter";
import { PublisherCycleApi } from "../../../api/cycles/publisher-cycle.api";
import { isPublisherCycleUnique } from "../is-publisher-cycle-name-unique.validator";

describe('isPublisherCycleUnique', () => {

  let api: PublisherCycleApi;
  let form: FormGroup

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        PublisherCycleApi,
        PublisherCycleAdapter
      ]
    });
    api = TestBed.get(PublisherCycleApi);
    form = new FormGroup({
      cycleName: new FormControl(undefined, [Validators.required], [isPublisherCycleUnique(api)])
    })
  });

  it('should not return cycleNotUnique error when control is valid and dirty', () => {

    form.get('cycleName').setValue('value');
    form.updateValueAndValidity();

    let error = form.get('cycleName').hasError('cycleNotUnique');

    expect(error).toBeFalsy();

  });

  it('should return cycleNotUnique error when api returns an object', async (done) => {

    let cycle = new PublisherCycle('name', { id: 1, guid: UUID.UUID() });

    let spy = spyOn(api, 'getPublisherCycleByName')
      .and.returnValue(of(cycle))

    form.get('cycleName').setValue('name');
    form.updateValueAndValidity();

    form.get('cycleName')
      .statusChanges.subscribe(status => {
        const error = form.get('cycleName').hasError('cycleNotUnique');
        expect(spy).toHaveBeenCalled();
        expect(error).toBeTruthy();
        done();
      });

  });

  it('should not return cycleNotUnique error when api does not return an object', async (done) => {

    let spy = spyOn(api, 'getPublisherCycleByName')
      .and.returnValue(of(undefined))

    form.get('cycleName').setValue('name');
    form.updateValueAndValidity();

    form.get('cycleName')
      .statusChanges.subscribe(status => {
        const error = form.get('cycleName').hasError('cycleNotUnique');
        expect(spy).toHaveBeenCalled();
        expect(error).toBeFalsy();
        done();
      });
  })
});
