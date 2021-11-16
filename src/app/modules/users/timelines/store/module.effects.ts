import { ActivitiesPaginationEffects } from "./activities-pagination/activities-pagination.effects";
import { ToggleActivityEffects } from "./hide-or-show-activity/toggle-activity.effects";
import { TimeLinePageEffects } from "./timeline-page/timeline-page.effects";
import { TimeLineEffects } from "./timelines/timeline.effects";

export const moduleEffects: any[] = [
  TimeLineEffects,
  ActivitiesPaginationEffects,
  ToggleActivityEffects,
  TimeLinePageEffects]
