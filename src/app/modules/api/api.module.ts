import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as fromAuthApi from '../api/auth/index';
import * as fromAuthorApi from '../api/authors/index';
import * as fromAvatarsApi from '../api/avatars/index';
import * as fromPublishersApi from '../api/publishers/index';
import * as fromBookcaseApi from '../api/bookcases/index';
import * as fromBookApi from '../api/books/index';
import * as fromBrowseApi from '../api/browse/index';
import * as fromCyclesApi from '../api/cycles/index';
import * as fromFollowersApi from '../api/followers/index';
import * as fromLibrariansApi from '../api/librarians/index';
import * as fromProfilesApi from '../api/profiles/index';
import * as fromQuotesApi from '../api/quotes/index';
import * as fromRatingsApi from '../api/ratings/index';
import * as fromReadersApi from '../api/readers/index';
import * as fromReviewsApi from '../api/reviews/index';
import * as fromSeriesApi from '../api/series/index';
import * as fromReaderStatisticsApi from '../api/statistics/index';
import * as fromTicketsApi from '../api/tickets/index';
import * as fromTimeslinesApi from '../api/timelines/index';
import { ApiErrorAdapter } from './error-adapter';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ...fromAuthApi.api,
    ...fromAuthApi.adapters,
    ...fromAuthorApi.api,
    ...fromAuthorApi.adapters,
    ...fromAvatarsApi.api,
    ...fromPublishersApi.api,
    ...fromPublishersApi.adapters,
    ...fromBookcaseApi.api,
    ...fromBookcaseApi.adapters,
    ...fromBookApi.api,
    ...fromBookApi.adapters,
    ...fromBrowseApi.api,
    ...fromCyclesApi.api,
    ...fromCyclesApi.adapters,
    ...fromFollowersApi.api,
    ...fromLibrariansApi.api,
    ...fromLibrariansApi.adapters,
    ...fromProfilesApi.api,
    ...fromProfilesApi.adapters,
    ...fromQuotesApi.api,
    ...fromQuotesApi.adapters,
    ...fromRatingsApi.api,
    ...fromRatingsApi.adapters,
    ...fromReadersApi.api,
    ...fromReadersApi.adapters,
    ...fromReviewsApi.api,
    ...fromReviewsApi.adapters,
    ...fromSeriesApi.api,
    ...fromSeriesApi.adapters,
    ...fromReaderStatisticsApi.api,
    ...fromTicketsApi.api,
    ...fromTicketsApi.adapters,
    ...fromTimeslinesApi.api,
    ...fromTimeslinesApi.adapters,
    ApiErrorAdapter
  ]
})
export class ApiModule { }
