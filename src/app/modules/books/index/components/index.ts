import { AuthorCollectionBookStarsComponent } from './author-collection-book-stars/author-collection-book-stars.component';
import { AuthorCollectionBookStatisticsComponent } from './author-collection-book-statistics/author-collection-book-statistics.component';
import { AuthorCollectionCoverComponent } from './author-collection-cover/author-collection-cover.component';
import { AuthorCollectionItemComponent } from './author-collection-item/author-collection-item.component';
import { AddBookCommentComponent } from './book-add-comment/add-book-comment.component';
import { AddBookCommentService } from './book-add-comment/services/add-book-comment.service';
import { AddBookQuoteDialogComponent } from './book-add-quote-dialog/add-book-quote-dialog.component';
import { BookAuthorComponent } from './book-author/book-author.component';
import { BookBasicsItemComponent } from './book-basics-item/book-basics-item.component';
import { BookCommentComponent } from './book-comment/book-comment.component';
import { BookCommentAvatarComponent } from './book-comment-avatar/book-comment-avatar.component';
import { BookCommentContentComponent } from './book-comment-content/book-comment-content.component';
import { BookCommentUserStatsComponent } from './book-comment-user-stats/book-comment-user-stats.component';
import { BookDescriptionComponent } from './book-description/book-description.component';
import { BookOnShelfComponent } from './book-on-shelf/book-on-shelf.component';
import { BookOtherSeriesBookComponent } from './book-other-series-book/book-other-series-book.component';
import { BookPublisherComponent } from './book-publisher/book-publisher.component';
import { BookQuoteComponent } from './book-quote/book-quote.component';
import { BookRatingsBarComponent } from './book-ratings-bar/book-ratings-bar.component';
import { BookRatingsCircleComponent } from './book-ratings-circle/book-ratings-circle.component';
import { BookSeriesComponent } from './book-series/book-series.component';
import { BookStatsComponent } from './book-stats/book-stats.component';
import { BookTagComponent } from './book-tag/book-tag.component';
import { CoverComponent } from './cover/cover.component';
import { CommentsPaginationComponent } from './comments-pagination/comments-pagination.component';

export const authorBookComponents: any[] = [AuthorCollectionBookStarsComponent,
    AuthorCollectionBookStatisticsComponent, AuthorCollectionCoverComponent,
    AuthorCollectionItemComponent];


export const commentsComponents: any[] = [
    AddBookCommentComponent,
    BookCommentComponent,
    BookCommentAvatarComponent,
    BookCommentContentComponent,
    BookCommentUserStatsComponent

]
export const commentsServices: any[] = [
    AddBookCommentService
]

export const dialogComponents: any[] = [
    AddBookQuoteDialogComponent
]

export const components: any[] = [
    BookAuthorComponent,
    BookBasicsItemComponent,
    BookDescriptionComponent,
    BookOnShelfComponent,
    BookOtherSeriesBookComponent,
    BookPublisherComponent,
    BookQuoteComponent,
    BookRatingsBarComponent,
    BookRatingsCircleComponent,
    BookSeriesComponent,
    BookStatsComponent,
    BookTagComponent,
    CoverComponent,
    CommentsPaginationComponent
];

export { QuoteLikeEvent } from '../../../shared/models/quote-like.event';
export { CommentReport as CommentReported } from './book-comment-content/events/comment-reported.event';
export { ToggleLike } from './book-comment-content/events/toggle-like.event';
export { ToggleSpoiler } from './book-comment-content/events/toggle-spoiler.event';

export { AddBookQuoteDialogComponent } from './book-add-quote-dialog/add-book-quote-dialog.component';

