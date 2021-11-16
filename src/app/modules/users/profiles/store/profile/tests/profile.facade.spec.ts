import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { UUID } from "angular2-uuid";
import { of } from "rxjs";
import { ApiModule } from "src/app/modules/api/api.module";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { About } from "src/app/modules/api/profiles/models/about.model";
import { Address } from "src/app/modules/api/profiles/models/adress.model";
import { ProfileSpecification } from "src/app/modules/api/profiles/models/profile-specification.model";
import { Profile } from "src/app/modules/api/profiles/models/profile.model";
import { ProfileApi } from "src/app/modules/api/profiles/profile.api";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { SEXES } from "src/app/modules/shared";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ProfilesModuleState, profilesStateReducer } from "../..";
import { ChangeProfileEffects } from "../../change-profile/change-profile.effects";
import { ProfileEffects } from "../profile.effects";
import { ProfileFacade } from "../profile.facade";

describe('PROFILE_FACADE', () => {

  let facade: ProfileFacade;
  let api: ProfileApi;

  const initialState: ProfilesModuleState = {
    changeProfile: {
      profile: undefined,
      processing: false,
      error: undefined
    },
    profiles: {
      entities: {},
      ids: [],
      processing: false,
      error: undefined
    },
    webPage: undefined,
    changeEmailFormState: undefined,
    changePasswordFormState: undefined,
    changeProfileFormState: undefined
  };

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('profiles', profilesStateReducer, { initialState }),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([ProfileEffects, ChangeProfileEffects])
      ],
      providers: [
        ProfileFacade,
        ApiErrorAdapter,
        ErrorActions,
        MesssagesFacade,
        ErrorsFacade
      ]
    });

    facade = TestBed.get(ProfileFacade);
    api = TestBed.get(ProfileApi);
  });

  describe('SELECT_PROFILE', () => {
    it('should dispatch an action and as a result of which profileByUserId$ observable should emit new value', async (done) => {

      const profile = new Profile();
      profile.about = new About('about', 'webstie', new Date());
      profile.address = new Address('country', 'city');
      profile.specification = new ProfileSpecification('firstName', 'secondName', new Date(), SEXES[0].id)
      profile.identification = { id: 1, guid: UUID.UUID() };
      profile.userId = 1;

      spyOn(api, 'getProfile').and.returnValue(of(profile));

      facade.selectProfile(profile.userId);

      const subscription = facade.profileByUserId$(profile.userId)
        .subscribe(val => {
          expect(val).toEqual(profile);
          done();
        });

      subscription.unsubscribe();

    });
  });

  describe('EDIT_PROFILE', () => {
    it('should dispatch an action and as a result of which changedProfile$ observable should emit new value', async (done) => {

      const profile = new Profile();
      profile.about = new About('about', 'webstie', new Date());
      profile.address = new Address('country', 'city');
      profile.specification = new ProfileSpecification('firstName', 'secondName', new Date(), SEXES[0].id)
      profile.identification = { id: 1, guid: UUID.UUID() };
      profile.userId = 1;

      spyOn(api, 'getProfile').and.returnValue(of(profile));

      facade.selectProfile(profile.userId);

      profile.about = new About('newAbout', 'newWebsite', new Date());

      spyOn(api, 'changeProfile').and.returnValue(of(profile));

      facade.editProfile(profile);

      const subscription = facade.changedProfile$.subscribe(val => {
        expect(val).toEqual(profile);
        done();
      });

      subscription.unsubscribe();

    });
  });

});
