import { ActivityData } from './activity-data.interface';
import { ActivityType } from './activity-type.interface';

export interface TimeLineActivity {
  date: Date
  activityData: ActivityData
  activityType: ActivityType
  show: boolean
}
