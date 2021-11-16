
import { BookComponent } from "./book.component";
import { AuthorCollectionBookStarsComponent } from "./components/author-collection-book-stars/author-collection-book-stars.component";
import { AuthorCollectionBookStatisticsComponent } from "./components/author-collection-book-statistics/author-collection-book-statistics.component";
import { AuthorCollectionCoverComponent } from "./components/author-collection-cover/author-collection-cover.component";
import { AuthorCollectionItemComponent } from "./components/author-collection-item/author-collection-item.component";
import { AddBookCommentComponent } from "./components/book-add-comment/add-book-comment.component";
import { AddBookCommentService } from "./components/book-add-comment/services/add-book-comment.service";
import { AddBookQuoteDialogComponent } from "./components/book-add-quote-dialog/add-book-quote-dialog.component";
import { BookAuthorComponent } from "./components/book-author/book-author.component";
import { BookBasicsItemComponent } from "./components/book-basics-item/book-basics-item.component";
import { BookCommentAvatarComponent } from "./components/book-comment-avatar/book-comment-avatar.component";
import { BookCommentContentComponent } from "./components/book-comment-content/book-comment-content.component";
import { BookCommentUserStatsComponent } from "./components/book-comment-user-stats/book-comment-user-stats.component";
import { BookCommentComponent } from "./components/book-comment/book-comment.component";
import { BookDescriptionComponent } from "./components/book-description/book-description.component";
import { BookOnShelfComponent } from "./components/book-on-shelf/book-on-shelf.component";
import { BookOtherSeriesBookComponent } from "./components/book-other-series-book/book-other-series-book.component";
import { BookPublisherComponent } from "./components/book-publisher/book-publisher.component";
import { BookQuoteComponent } from "./components/book-quote/book-quote.component";
import { BookRatingsBarComponent } from "./components/book-ratings-bar/book-ratings-bar.component";
import { BookRatingsCircleComponent } from "./components/book-ratings-circle/book-ratings-circle.component";
import { RemoveBookComponent } from "./components/book-remove/remove-book.component";
import { BookSeriesComponent } from "./components/book-series/book-series.component";
import { BookStatsComponent } from "./components/book-stats/book-stats.component";
import { BookTagComponent } from "./components/book-tag/book-tag.component";
import { CommentsSortingHeaderComponent } from "./components/comments-sorting-header/comments-sorting-header.component";
import { CommentsSortingOptionsComponent } from "./components/comments-sorting-options/comments-sorting-options.component";
import { CommentsSortingComponent } from "./components/comments-sorting/comments-sorting.component";
import { CoverComponent } from "./components/cover/cover.component";
import { CommentsPaginationComponent } from "./components/comments-pagination/comments-pagination.component";
import { BookViewService } from "./services/book-view.service";
import { UserViewService } from "./services/user-view.service";

export const container = BookComponent;

export const entryComponents = [AddBookQuoteDialogComponent, RemoveBookComponent];

export const services: any[] = [AddBookCommentService, BookViewService, UserViewService];

export const components: any = [
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
  CommentsPaginationComponent,
  AddBookCommentComponent,
  BookCommentComponent,
  BookCommentAvatarComponent,
  BookCommentContentComponent,
  BookCommentUserStatsComponent,
  AuthorCollectionBookStarsComponent,
  AuthorCollectionBookStatisticsComponent,
  AuthorCollectionCoverComponent,
  AuthorCollectionItemComponent,
  CommentsSortingComponent,
  CommentsSortingHeaderComponent, CommentsSortingOptionsComponent,
  RemoveBookComponent
];
