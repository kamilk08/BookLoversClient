import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { AuthService } from "src/app/modules/auth/services/auth.service";
import { About } from "../../../../../api/profiles/models/about.model";
import { Address } from "../../../../../api/profiles/models/adress.model";
import { ProfileSpecification } from "../../../../../api/profiles/models/profile-specification.model";
import { Profile } from "../../../../../api/profiles/models/profile.model";
import { CHANGE_PROFILE } from "../../change-profile/change-profile.actions";
import { ProfileFacade } from "../../profile/profile.facade";
import * as fromActions from './change-profile-form.actions';

@Injectable()
export class ChangeProfileFormEffects {

  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService,
    private readonly profileFacade: ProfileFacade
  ) {

  }

  submitChangeProfileForm$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SUBMIT_CHANGE_PROFILE_FORM),
      map(action => action.payload.form),
      switchMap((form) => [form.valid ?
        fromActions.CHANGE_PROFILE_FORM_VALID({ payload: { form } })
        : fromActions.CHANGE_PROFILE_FORM_INVALID()])
    ));

  changeProfileFormValid$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.CHANGE_PROFILE_FORM_VALID),
      map(action => action.payload.form),
      withLatestFrom(this.profileFacade.profileByUserId$(this.authService.userId)),
      map(stream => ({ form: stream[0], profile: stream[1] })),
      switchMap((stream) => [CHANGE_PROFILE({ payload: { profile: this.getEditetProfile(stream.profile, stream.form) } })])
    ))

  public getEditetProfile(profile: Profile, form: FormGroup) {
    const specification = form.get('identity').value as ProfileSpecification
    const adress = form.get('address').value as Address;
    const aboutUser = form.get('about').value as About

    profile.editIdentity(specification.firstName, specification.secondName, specification.birthDate, specification.sex);
    profile.editAddress(adress.country, adress.city);
    profile.editAbout(aboutUser.content, aboutUser.webSite);

    return profile;
  }

}
