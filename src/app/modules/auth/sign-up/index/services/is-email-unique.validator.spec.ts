import { HttpClientModule } from "@angular/common/http";
import { fakeAsync, flush, flushMicrotasks, TestBed, tick } from "@angular/core/testing"
import { FormControl, FormGroup } from "@angular/forms"
import { of } from "rxjs";
import { SignUpApi } from "src/app/modules/api/auth/sign-up/sign-up.api"
import { isEmailUnique } from "./is-email-unique.validator";

describe('email uniqueness validator', () => {
  let api: SignUpApi;
  let form: FormGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [SignUpApi]
    })

    api = TestBed.get(SignUpApi);

    form = new FormGroup({
      test: new FormControl(undefined, [], [isEmailUnique(api)])
    });
  });

  it('should set an error on test control of form object of type emailNotUnique', fakeAsync(() => {

    spyOn(api, 'isEmailUnique').and.returnValue(of(true));

    form.get('test').setValue('email');

    form.updateValueAndValidity();

    tick(5000);

    const flag = form.get('test').hasError('emailNotUnique');

    expect(flag).toBeTruthy();

    flushMicrotasks();
    flush();

  }))
})
