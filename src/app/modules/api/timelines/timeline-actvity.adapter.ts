import { Adapter } from 'src/app/modules/shared';
import { TimeLineActivity } from './models/timeline-activity.interface';
import { ACTIVITY_TYPES } from './models/activity-type.interface';

export class TimeLineActivityAdapter implements Adapter<TimeLineActivity> {
  adapt(item: any): TimeLineActivity {

    if (!item)
      return undefined;

    const activity: TimeLineActivity = {
      date: item.date,
      activityData: { id: item.id, activityObjectGuid: item.activityObjectGuid },
      activityType: ACTIVITY_TYPES.find(f => f.id === item.activityType),
      show: item.show
    };

    return activity;
  }

}
