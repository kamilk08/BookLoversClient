import { BookAddedTimeLineItemDetailsComponent } from "./components/book-added-timeline-item/book-added-timeline-item-details/book-added-timeline-item-details.component";
import { BookAddedTimeLineItemComponent } from "./components/book-added-timeline-item/book-added-timeline-item.component";
import { BookReviewTimeLineItemDetailsComponent } from "./components/book-review-timeline-item/book-review-timeline-item-details/book-review-timeline-item-details.component";
import { BookReviewTimeLineItemComponent } from "./components/book-review-timeline-item/book-review-timeline-item.component";
import { LostFollowerTimelineItemComponent } from "./components/lost-follower-timeline-item/lost-follower-timeline-item.component";
import { NewBookInBookcaseDetailsComponent } from "./components/new-book-in-bookcase-timeline-item/new-book-in-bookcase-details/new-book-in-bookcase-details.component";
import { NewBookInBookcaseTimelineItemComponent } from "./components/new-book-in-bookcase-timeline-item/new-book-in-bookcase-timeline-item.component";
import { NewFollowerTimelineItemComponent } from "./components/new-follower-timeline-item/new-follower-timeline-item.component";
import { TimeLineItemsPaginationComponent } from "./components/timeline-items-pagination/timeline-items-pagination.component";
import { TimelineComponent } from "./timeline.component";

export const components: any[] = [TimelineComponent, NewBookInBookcaseTimelineItemComponent,
  NewFollowerTimelineItemComponent, TimeLineItemsPaginationComponent,
  LostFollowerTimelineItemComponent, NewBookInBookcaseDetailsComponent,
  BookAddedTimeLineItemComponent, BookAddedTimeLineItemDetailsComponent,
  BookReviewTimeLineItemComponent, BookReviewTimeLineItemDetailsComponent]
