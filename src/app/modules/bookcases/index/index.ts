import { RemoveFromReadedShelfComponent } from "../bookcase-preview/components/remove-from-readed-shelf/remove-from-readed-shelf.component";
import { BookcaseComponent } from "./bookcase.component";
import { BookcaseGuard } from "./bookcase.guard";
import { BookInBookcaseShelfTagComponent } from "./components/book-in-bookcase-shelf-tag/book-in-bookcase-shelf-tag.component";
import { BookInBookcaseUserRatingComponent } from "./components/book-in-bookcase-user-rating/book-in-bookcase-user-rating.component";
import { BookcaseBookContentComponent } from "./components/bookcase-book-content/bookcase-book-content.component";
import { BookcaseBookCoverComponent } from "./components/bookcase-book-cover/bookcase-book-cover.component";
import { BookcaseBookComponent } from "./components/bookcase-book/bookcase-book.component";
import { BookcasePaginationComponent } from "./components/bookcase-pagination/bookcase-pagination.component";
import { BookcaseSearchBarComponent } from "./components/bookcase-search-bar/bookcase-search-bar.component";
import { BookcaseShelvesComponent } from "./components/bookcase-shelves/bookcase-shelves.component";
import { BookcaseSortingComponent } from "./components/bookcase-sorting/bookcase-sorting.component";
import { RecentlyAddedBookCoverComponent } from "./components/recently-added-book-cover/recently-added-book-cover.component";
import { RecentlyAddedBookInfoComponent } from "./components/recently-added-book-info/recently-added-book-info.component";
import { RecentlyAddedBookComponent } from "./components/recently-added-book/recently-added-book.component";
import { RemoveFromBookcaseComponent } from "./components/remove-from-bookcase/remove-from-bookcase.component";
import { ShelfRecordComponent } from "./components/shelf-record/shelf-record.component";
import { ShelfComponent } from "./components/shelf/shelf.component";
import { UserActionComponent } from "./components/user-action/user-action.component";

export const containers: any[] = [
  BookcaseComponent
];

export const components: any[] = [
  BookInBookcaseShelfTagComponent,
  BookInBookcaseUserRatingComponent,
  BookcaseBookComponent,
  BookcaseBookContentComponent,
  BookcaseBookCoverComponent,
  BookcasePaginationComponent,
  BookcaseSearchBarComponent,
  BookcaseShelvesComponent,
  BookcaseSortingComponent,
  RecentlyAddedBookComponent,
  RecentlyAddedBookCoverComponent,
  RecentlyAddedBookInfoComponent,
  ShelfComponent,
  ShelfRecordComponent,
  RemoveFromBookcaseComponent,
  UserActionComponent, RemoveFromReadedShelfComponent
];

export const entryComponents: any[] = [RemoveFromBookcaseComponent,
  RemoveFromReadedShelfComponent];

export const pageServices: any[] = [BookcaseGuard]
