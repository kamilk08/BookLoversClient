import { Profiles } from "../profile.reducer";

import * as fromActions from '../profile.actions';
import * as fromReducer from '../profile.reducer';
import { UUID } from "angular2-uuid";
import { About } from "src/app/modules/api/profiles/models/about.model";
import { Address } from "src/app/modules/api/profiles/models/adress.model";
import { ProfileSpecification } from "src/app/modules/api/profiles/models/profile-specification.model";
import { Profile } from "src/app/modules/api/profiles/models/profile.model";
import { SEXES } from "src/app/modules/shared";

describe('PROFILE_REDUCER', () => {

  const initialState: Profiles = {
    entities: {},
    ids: [],
    processing: false,
    error: undefined
  };

  describe('SELECT_PROFILE', () => {
    it('should return new state with processing property set to true', () => {

      const userId = 1;

      const action = fromActions.SELECT_PROFILE({ payload: { userId } });

      const newState = fromReducer.profileReducer(initialState, action);

      expect(newState.processing).toBeTruthy();

    });
  });

  describe('FETCH_PROFILE', () => {
    it('should return new state with updated entities property', () => {

      const profile = new Profile();
      profile.about = new About('about', 'webstie', new Date());
      profile.address = new Address('country', 'city');
      profile.specification = new ProfileSpecification('firstName', 'secondName', new Date(), SEXES[0].id)
      profile.identification = { id: 1, guid: UUID.UUID() };
      profile.userId = 1;

      const action = fromActions.FETCH_PROFILE({ payload: { profileId: profile.identification.id, profile } });

      const newState = fromReducer.profileReducer(initialState, action);

      expect(newState.entities[action.payload.profileId]).toEqual(profile);

    })
  });

  describe('UPDATE_PROFILE', () => {
    it('should return new state with updated profile', () => {

      const profile = new Profile();
      profile.about = new About('about', 'webstie', new Date());
      profile.address = new Address('country', 'city');
      profile.specification = new ProfileSpecification('firstName', 'secondName', new Date(), SEXES[0].id)
      profile.identification = { id: 1, guid: UUID.UUID() };
      profile.userId = 1;

      const fetchAction = fromActions.FETCH_PROFILE({ payload: { profileId: profile.identification.id, profile } });

      const fetchState = fromReducer.profileReducer(initialState, fetchAction);

      profile.about = new About('updatedAbout', 'updatedWebsite', new Date());

      const action = fromActions.UPDATE_PROFILE({ payload: { profile } });

      const newState = fromReducer.profileReducer(fetchState, action);

      expect(newState.entities[profile.identification.id]).toEqual(profile);
    })
  });

});
