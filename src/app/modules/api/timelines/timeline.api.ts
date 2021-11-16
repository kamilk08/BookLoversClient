import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GET_TIMELINE_BY_READER_ID, GET_TIMELINE_ACTIVITIES, HIDE_ACTIVITY, SHOW_ACTIVITY, GET_TIMELINE_BY_ID } from './timeline.urls';
import { map } from 'rxjs/operators';
import { TimeLineAdapter } from './timeline.adapter';
import { TimeLineActivityAdapter } from './timeline-actvity.adapter';
import { DEFAULT_HEADERS } from 'src/app/modules/shared/headers/url.headers';
import { PageResult } from 'src/app/modules/shared/common/page-result';
import { Query } from 'src/app/modules/shared/common/query';
import { HideActivity } from './models/hide-activity';
import { ShowActivity } from './models/show-activity';

@Injectable()
export class TimeLineApi {

  constructor(private readonly http: HttpClient,
    private readonly adapter: TimeLineAdapter,
    private readonly activityAdapter: TimeLineActivityAdapter) {

  }

  showActivity(model: ShowActivity) {
    return this.http.put(SHOW_ACTIVITY, JSON.stringify(model), { headers: DEFAULT_HEADERS() })
  }

  hideActivity(model: HideActivity) {
    return this.http.put(HIDE_ACTIVITY, JSON.stringify(model), { headers: DEFAULT_HEADERS() });
  }

  getTimeLine(id: number) {
    return this.http.get(GET_TIMELINE_BY_ID(id), { headers: DEFAULT_HEADERS() })
      .pipe(map(response => this.adapter.adapt(response)))
  }

  getReaderTimeLine(readerId: number) {
    return this.http.get(GET_TIMELINE_BY_READER_ID(readerId), { headers: DEFAULT_HEADERS() })
      .pipe(map(response => this.adapter.adapt(response)))
  }

  getTimeLineActivities(timelineId: number, query: Query, hidden: boolean) {
    return this.http.get(GET_TIMELINE_ACTIVITIES(timelineId, query.page, query.count, hidden))
      .pipe(map((response: any) => {
        let pageResult = response as PageResult;
        pageResult.items = Array.from(response.items).map(item => this.activityAdapter.adapt(item));
        return pageResult;
      }))
  }
}
