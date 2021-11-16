import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { UUID } from "angular2-uuid";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { About } from "src/app/modules/api/profiles/models/about.model";
import { Address } from "src/app/modules/api/profiles/models/adress.model";
import { ProfileSpecification } from "src/app/modules/api/profiles/models/profile-specification.model";
import { Profile } from "src/app/modules/api/profiles/models/profile.model";
import { SEXES } from "src/app/modules/shared";
import { ProfileFacade } from "../../../profile/profile.facade";
import { ChangeProfileFormEffects } from "../change-profile-form.effects";

import * as fromActions from '../change-profile-form.actions';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CommonValidators } from "src/app/modules/shared/common/validators";
import { CHANGE_PROFILE } from "../../../change-profile/change-profile.actions";
import { AuthService } from "src/app/modules/auth/services/auth.service";
import { CookiesService } from "src/app/modules/auth/services/cookies.service";
import { TokenService } from "src/app/modules/auth/services/token.service";

describe('CHANGE_PROFILE_FORM_EFFECTS', () => {

  const profile = new Profile();
  profile.about = new About('about', 'webstie', new Date());
  profile.address = new Address('country', 'city');
  profile.specification = new ProfileSpecification('firstName', 'secondName', new Date(), SEXES[0].id)
  profile.identification = { id: 1, guid: UUID.UUID() };
  profile.userId = 1;

  let effects: ChangeProfileFormEffects;
  let scheduler: TestScheduler;
  let actions$: Observable<Action> = new Observable<Action>();

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule
      ],
      providers: [
        ChangeProfileFormEffects,
        AuthService,
        TokenService,
        CookiesService,
        provideMockActions(() => actions$),
        {
          provide: ProfileFacade,
          useValue: {
            profileByUserId$: (userId: number) => of(profile)
          }
        }
      ]
    });

    effects = TestBed.get(ChangeProfileFormEffects)
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
  });

  describe('SUBMIT_CHANGE_PROFILE_FORM$', () => {
    it('should assign CHANGE_PROFILE_FORM_VALID when form was valid', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const form = createChangeProfileForm();
        form.get('identity.sex').setValue(1);
        form.updateValueAndValidity();

        const action = fromActions.SUBMIT_CHANGE_PROFILE_FORM({ payload: { form } });

        actions$ = hot('a', { a: action });

        const completion = fromActions.CHANGE_PROFILE_FORM_VALID({ payload: { form } });

        expectObservable(effects.submitChangeProfileForm$)
          .toBe('b', { b: completion });
      })
    });

    it('should assign CHANGE_PROFILE_FORM_INVALID when form was not valid', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const form = createChangeProfileForm();
        form.get('identity.sex').setValue(0);
        form.updateValueAndValidity();

        const action = fromActions.SUBMIT_CHANGE_PROFILE_FORM({ payload: { form } });

        actions$ = hot('a', { a: action });

        const completion = fromActions.CHANGE_PROFILE_FORM_INVALID();

        expectObservable(effects.submitChangeProfileForm$)
          .toBe('b', { b: completion });

      });

    });

  });

  describe('CHANGE_PROFILE_FORM_VALID$', () => {
    it('should assign CHANGE_PROFILE action', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const form = createChangeProfileForm();
        form.get('identity.sex').setValue(1);
        form.updateValueAndValidity();

        const action = fromActions.CHANGE_PROFILE_FORM_VALID({ payload: { form } });

        actions$ = hot('a', { a: action });

        const completion = CHANGE_PROFILE({ payload: { profile: getEditetProfile(profile, form) } })

        expectObservable(effects.changeProfileFormValid$)
          .toBe('b', { b: completion });

      });
    })
  });

  function createChangeProfileForm() {
    return new FormGroup({
      identity: new FormGroup({
        firstName: new FormControl(),
        secondName: new FormControl(),
        birthDate: new FormControl(null, [CommonValidators.invalidDate]),
        sex: new FormControl(null, [Validators.minLength(1), Validators.maxLength(3)])
      }),
      address: new FormGroup({
        country: new FormControl(),
        city: new FormControl()
      }),
      about: new FormGroup({
        webSite: new FormControl(),
        content: new FormControl()
      })
    })
  };

  function getEditetProfile(profile: Profile, form: FormGroup) {
    const specification = form.get('identity').value as ProfileSpecification
    const adress = form.get('address').value as Address;
    const aboutUser = form.get('about').value as About

    profile.editIdentity(specification.firstName, specification.secondName, specification.birthDate, specification.sex);
    profile.editAddress(adress.country, adress.city);
    profile.editAbout(aboutUser.content, aboutUser.webSite);

    return profile;
  }

})
