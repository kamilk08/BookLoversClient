import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SELECT_READER_TIMELINE, SELECT_TIMELINE as SELECT_TIMELINE_BY_ID } from './timelines/timeline.actions';
import { SELECT_ACTIVITIES_PAGE } from './activities-pagination/activities-pagination.actions';
import { Query } from '../../../shared/common/query';
import { TimeLineActivity } from '../../../api/timelines/models/timeline-activity.interface';
import { HIDE_ACTIVITY, SHOW_ACTIVITY } from './hide-or-show-activity/toggle-activity.actions';
import * as fromModule from './index';
import * as fromSelectors from './module.selectors';

@Injectable()
export class TimeLineFacade {

  public readonly error$ = this.store.select(fromSelectors.error);

  public readonly timeLineById$ = (id: number) => this.store.select(fromSelectors.getTimeLineById(id));
  public readonly readerTimeLine$ = (readerId: number) => this.store.select(fromSelectors.getReaderTimeLine(readerId))

  public readonly getActivities$ = (ids: number[], showHidden: boolean) => this.store.select(fromSelectors.getActivities(ids, showHidden));

  public readonly activitiesPageResult$ = this.store.select(fromSelectors.activitiesPageResult);
  public readonly isProcessingActivities$ = this.store.select(fromSelectors.isProcessingActivitiesPage);
  public readonly hasTimeLineActvities$ = this.store.select(fromSelectors.hasTimeLineActvities);

  public readonly toggledActivity$ = this.store.select(fromSelectors.toggledAcitivty);

  constructor(private store: Store<fromModule.TimeLinesModuleState>) {

  }

  hideActivity(activity: TimeLineActivity) {
    this.store.dispatch(HIDE_ACTIVITY({ payload: { activity } }))
  }

  showActivity(activity: TimeLineActivity) {
    this.store.dispatch(SHOW_ACTIVITY({ payload: { activity } }))
  }

  selectTimeLine(id: number) {
    this.store.dispatch(SELECT_TIMELINE_BY_ID({ payload: { id } }));
  }

  selectReaderTimeLine(readerId: number) {
    this.store.dispatch(SELECT_READER_TIMELINE({ payload: { readerId } }));
  }

  selectActivities(timelineId: number, query: Query, hidden: boolean) {
    this.store.dispatch(SELECT_ACTIVITIES_PAGE({ payload: { timelineId, query, hidden } }))
  }
}
