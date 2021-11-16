
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { ApiModule } from 'src/app/modules/api/api.module';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { FollowersApi } from 'src/app/modules/api/followers/followers.api';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { ErrorsFacade } from 'src/app/modules/errors/store/errors.facade';
import { MesssagesFacade } from 'src/app/modules/shared/store/messages/message.facade';
import * as fromActions from '../is-following.actions';
import { IsFollowingEffects } from '../is-following.effects';
import { IsFollowingState } from '../is-following.reducer';

describe('IS_FOLLOWING_EFFECTS', () => {

  let effects: IsFollowingEffects;
  let api: FollowersApi;
  let scheduler: TestScheduler;
  let actions$: Observable<Action> = new Observable<Action>();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule

      ],
      providers: [
        IsFollowingEffects,
        provideMockActions(() => actions$),
        provideMockStore<IsFollowingState>(),
        ApiErrorAdapter,
        ErrorActions,
        ErrorsFacade,
        MesssagesFacade
      ]
    });

    effects = TestBed.get(IsFollowingEffects);
    api = TestBed.get(FollowersApi);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
  });

  describe('IS_FOLLOWING$ ', () => {

    it('should assign FETCH_IS_FOLLOWING_STATE when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const followedId = 1;

        const action = fromActions.IS_FOLLOWING({ payload: { followedId } });

        spyOn(api, 'isFollowing').and.returnValue(of(true));

        actions$ = hot('a', { a: action });

        const completion = fromActions.FETCH_IS_FOLLOWING_STATE({ payload: { followedId, flag: true } });

        expectObservable(effects.isFollowing$)
          .toBe('b', { b: completion });
      });

    });

  });

});
