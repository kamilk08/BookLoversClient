import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { ApiModule } from "src/app/modules/api/api.module";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { timeLineStateReducer } from "../..";
import { TimeLinePageFacade } from "../timeline-page.facade";

describe('TIMELINE_PAGE_FACADE', () => {

  let facade: TimeLinePageFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('timelines', timeLineStateReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([])
      ],
      providers: [
        TimeLinePageFacade,
        ApiErrorAdapter,
        ErrorActions
      ]
    });

    facade = TestBed.get(TimeLinePageFacade);
  });

  describe('SET_TIMELINE_ID', () => {
    it('should dispatch an action and as a result of which timeLineId$ observable should emit new value', async (done) => {

      const timeLineId = 1;

      facade.setTimeLineId(timeLineId);

      const subscription = facade.timeLineId$.subscribe(val => {
        expect(val).toEqual(timeLineId);
        done();
      });

      subscription.unsubscribe();

    })
  });

  describe('INCLUDE_HIDDEN_ACTIVITIES', () => {
    it('it should dispatch an action and as a result of which showHiddenActivities$ should emit new value', async (done) => {

      const flag = true;

      facade.includeHiddenActivities(flag);

      const subscription = facade.showHiddenActivities$
        .subscribe(val => {
          expect(val).toEqual(flag);
          done();
        });

      subscription.unsubscribe();
    });
  });

});
