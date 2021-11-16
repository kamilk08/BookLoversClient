import { ChangeProfileState } from "../change-profile.reducer";

import * as fromActions from '../change-profile.actions';
import * as fromReducer from '../change-profile.reducer';
import { Profile } from "src/app/modules/api/profiles/models/profile.model";
import { UUID } from "angular2-uuid";
import { About } from "src/app/modules/api/profiles/models/about.model";
import { Address } from "src/app/modules/api/profiles/models/adress.model";
import { ProfileSpecification } from "src/app/modules/api/profiles/models/profile-specification.model";
import { SEXES } from "src/app/modules/shared";
import { HttpErrorResponse } from "@angular/common/http";
import { ApiError } from "src/app/modules/api/api-error.model";

describe('CHANGE_PROFILE_REDUCER', () => {

  const initialState: ChangeProfileState = {
    profile: undefined,
    processing: false,
    error: undefined
  };

  describe('CHANGE_PROFILE', () => {
    it('should return new state with processing property set to true and updated profile property', () => {

      const profile = new Profile();
      profile.about = new About('about', 'webstie', new Date());
      profile.address = new Address('country', 'city');
      profile.specification = new ProfileSpecification('firstName', 'secondName', new Date(), SEXES[0].id)
      profile.identification = { id: 1, guid: UUID.UUID() };
      profile.userId = 1;

      const action = fromActions.CHANGE_PROFILE({ payload: { profile } });

      const newState = fromReducer.changeProfileReducer(initialState, action);

      expect(newState.processing).toBeTruthy();

    });

  });

  describe('CHANGE_PROFILE_SUCCESS', () => {
    it('should return new state with processing property set to false', () => {

      const profile = new Profile();
      profile.about = new About('about', 'webstie', new Date());
      profile.address = new Address('country', 'city');
      profile.specification = new ProfileSpecification('firstName', 'secondName', new Date(), SEXES[0].id)
      profile.identification = { id: 1, guid: UUID.UUID() };
      profile.userId = 1;

      const action = fromActions.CHANGE_PROFILE_SUCCESS({ payload: { profile } });

      const newState = fromReducer.changeProfileReducer(initialState, action);

      expect(newState.processing).toBeFalsy();
    });
  });

  describe('CHANGE_PROFILE_FALIURE', () => {
    it('should return new state with defined error property', () => {

      const error = new ApiError();

      const action = fromActions.CHANGE_PROFILE_FALIURE({ payload: { model: error } });

      const newState = fromReducer.changeProfileReducer(initialState, action);

      expect(newState.error).toBeDefined();
    });
  })


});
