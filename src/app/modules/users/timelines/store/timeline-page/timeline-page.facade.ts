import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { ActivityType } from "../../../../api/timelines/models/activity-type.interface";
import { TimeLineActivity } from "../../../../api/timelines/models/timeline-activity.interface";
import * as fromIndex from '../index';
import { EXPAND_TIMELINE_ACTIVITY, NEXT_TIMELINE_ACTIVITIES_PAGE, SET_TIMELINE_ID_ON_TIMELINE_PAGE, INCLUDE_HIDDEN_ACTIVITIES, TOGGLE_ACTIVITY } from "./timeline-page.actions";
import * as fromSelectors from './timeline-page.selectors';

@Injectable()
export class TimeLinePageFacade {

  public readonly timeLineId$ = this.store.select(fromSelectors.timeLineId);
  public readonly showHiddenActivities$ = this.store.select(fromSelectors.showHiddenActivities);
  public readonly pageSize$ = this.store.select(fromSelectors.pageSize);
  public readonly currentPage$ = this.store.select(fromSelectors.currentPage);

  constructor(private store: Store<fromIndex.TimeLinesModuleState>) {}

  setTimeLineId(id: number) {
    this.store.dispatch(SET_TIMELINE_ID_ON_TIMELINE_PAGE({ payload: { id } }));
  }

  expandActivity(activityType: ActivityType, activityObject: any) {
    this.store.dispatch(EXPAND_TIMELINE_ACTIVITY({ payload: { activityType, activityObject } }));
  }

  toggleActivity(activity: TimeLineActivity) {
    this.store.dispatch(TOGGLE_ACTIVITY({ payload: { activity } }))
  }

  includeHiddenActivities(flag: boolean) {
    this.store.dispatch(INCLUDE_HIDDEN_ACTIVITIES({ payload: { flag } }))
  }

  changePage(page: number) {
    this.store.dispatch(NEXT_TIMELINE_ACTIVITIES_PAGE({ payload: { page } }))
  }
}
