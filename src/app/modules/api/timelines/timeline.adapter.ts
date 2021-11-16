import { Injectable } from '@angular/core';
import { Adapter } from 'src/app/modules/shared';
import { TimeLine } from './models/timeline.interface';

@Injectable()
export class TimeLineAdapter implements Adapter<TimeLine> {
  adapt(item: any): TimeLine {

    if (!item)
      return undefined;

    const timeLine: TimeLine = {
      indentification: { id: item.id, guid: item.guid },
      readerId: item.readerId,
      activitiesCount: item.activitiesCount
    };

    return timeLine;
  }
}
