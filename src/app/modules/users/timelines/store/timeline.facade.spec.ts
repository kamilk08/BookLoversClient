import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { UUID } from "angular2-uuid";
import { ApiModule } from "src/app/modules/api/api.module";
import { NEW_FOLLOWER } from "src/app/modules/api/timelines/models/activity-type.interface";
import { TimeLineActivity } from "src/app/modules/api/timelines/models/timeline-activity.interface";
import { TimeLine } from "src/app/modules/api/timelines/models/timeline.interface";
import { TimeLineApi } from "src/app/modules/api/timelines/timeline.api";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { TimeLinesModuleState, timeLineStateReducer } from ".";
import { ToggleActivityEffects } from "./hide-or-show-activity/toggle-activity.effects";
import { TimeLineFacade } from "./timeline.facade";
import { TimeLineEffects } from "./timelines/timeline.effects";

describe('TIMELINE_FACADE', () => {

  let facade: TimeLineFacade;
  let api: TimeLineApi;

  const item: TimeLineActivity = {
    date: new Date(),
    activityData: {
      id: 1,
      activityObjectGuid: UUID.UUID()
    },
    activityType: NEW_FOLLOWER,
    show: true
  };
  const timeLine: TimeLine = {
    indentification: {
      id: 1,
      guid: UUID.UUID()
    },
    readerId: 1,
    activitiesCount: 0
  };

  let moduleState: TimeLinesModuleState = {
    timelinesState: {
      entities: { 1: timeLine },
      ids: [timeLine.indentification.id],
      error: undefined,
      processing: false
    },
    activitiesState: {
      entities: { 1: item },
      ids: [item.activityData.id],
      error: undefined
    },
    activitiesPaginationState: undefined,
    toggleActivitiesState: undefined,
    timeLinePageState: undefined
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('timelines', timeLineStateReducer, { initialState: moduleState }),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([TimeLineEffects, ToggleActivityEffects])
      ],
      providers: [
        TimeLineFacade,
        TimeLineEffects,
        ToggleActivityEffects,
        ErrorActions,
        ErrorsFacade,
        MesssagesFacade
      ]
    });

    facade = TestBed.get(TimeLineFacade);
    api = TestBed.get(TimeLineApi);
  });

  describe('HIDE_ACTIVITY', () => {
    it('should dispatch an action and as a result of which selcted activity should have show property set to false', async (done) => {

      facade.hideActivity(item);

      const subscription = facade.getActivities$([item.activityData.id], false)
        .subscribe(val => {
          expect(val[0]).toEqual(item)
          done();
        });

      subscription.unsubscribe();

    });
  });

  describe('SHOW_ACTIVITY', () => {
    it('should dispatch an action and as a result of which selcted activity should have show property set to true', async (done) => {

      facade.showActivity(item);

      const subscription = facade.getActivities$([item.activityData.id], true)
        .subscribe(val => {
          expect(val[0]).toEqual(item);
          done();
        });

      subscription.unsubscribe();

    });
  });

  describe('SELECT_TIMELINE', () => {
    it('should dispatch an actiona and as a result of which timeline$ observable should emit new value', async (done) => {

      const subscription = facade.timeLineById$(timeLine.indentification.id)
        .subscribe(val => {
          expect(val).toEqual(timeLine);
          done();
        });

      subscription.unsubscribe();

    });
  });

});
