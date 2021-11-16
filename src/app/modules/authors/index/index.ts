import { AddAuthorQuoteComponent } from './components/add-author-quote/add-author-quote.component';
import { AuthorBookContentComponent } from './components/author-book-content/author-book-content.component';
import { AuthorBookCoverComponent } from './components/author-book-cover/author-book-cover.component';
import { AuthorBookItemComponent } from './components/author-book-item/author-book-item.component';
import { AuthorBooksPaginationComponent } from './components/author-books-pagination/author-books-pagination.component';
import { AuthorGenresComponent } from './components/author-genres/author-genres.component';
import { AuthorImageComponent } from './components/author-image/author-image.component';
import { AuthorQuoteLikesComponent } from './components/author-quote-likes/author-quote-likes.component';
import { AuthorQuoteItemComponent } from './components/author-quote-item/author-quote-item.component';
import { AuthorQuotesPaginationComponent } from './components/author-quotes-pagination/author-quotes-pagination.component';
import { AuthorBooksSearchComponent } from './components/author-search/author-books-search.component';
import { AuthorSeriesCoverComponent } from './components/author-series-cover/author-series-cover.component';
import { AuthorSeriesContentComponent } from './components/author-series-content/author-series-content.component';
import { AuthorSeriesItemComponent } from './components/author-series-item/author-series-item.component';
import { AuthorSeriesPaginationComponent } from './components/author-series-pagination/author-series-pagination.component';
import { AuthorStatisticsComponent } from './components/author-statistics/author-statistics.component';
import { FollowAuthorComponent } from './components/follow-author/follow-author.component';
import { AuthorDescriptionComponent } from './components/author-description/author-description.component';
import { AuthorComponent } from './author.component';
import { AuthorRemoveComponent } from './components/author-remove/author-remove.component';


export const components: any[] = [AuthorComponent, AddAuthorQuoteComponent, AuthorBookContentComponent, AuthorBookCoverComponent,
  AuthorBookItemComponent, AuthorBooksPaginationComponent, AuthorDescriptionComponent, AuthorGenresComponent,
  AuthorImageComponent, AuthorQuoteItemComponent, AuthorQuoteLikesComponent, AuthorQuotesPaginationComponent,
  AuthorBooksSearchComponent, AuthorSeriesContentComponent, AuthorSeriesCoverComponent,
  AuthorSeriesItemComponent, AuthorSeriesPaginationComponent, AuthorStatisticsComponent, FollowAuthorComponent,
  AuthorRemoveComponent
]

export const entryComponents = [AddAuthorQuoteComponent, AuthorRemoveComponent];
