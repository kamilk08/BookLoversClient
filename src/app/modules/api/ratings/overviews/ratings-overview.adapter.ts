import { Injectable } from '@angular/core';
import { RatingAdapter } from 'src/app/modules/api/ratings/rating.adapter';
import { Adapter } from '../../../shared/adapter';
import { RatingsOverview } from '../models/ratings-overview.model';

@Injectable()
export class RatingsOverviewAdapter implements Adapter<RatingsOverview> {

  constructor(public ratingAdapter: RatingAdapter) { }

  adapt(item: any): RatingsOverview {

    if (!item)
      return new RatingsOverview({ bookId: item.bookId, bookGuid: item.bookGuid })

    const overview: RatingsOverview = {
      id: item.id,
      book: {
        bookId: item.bookId,
        bookGuid: item.bookGuid
      },
      average: item.average,
      ratings: Array.from(item.ratings).map(item => this.ratingAdapter.adapt(item)),
      addRating: RatingsOverview.prototype.addRating,
      changeRating: RatingsOverview.prototype.changeRating,
      removeRating: RatingsOverview.prototype.removeRating,
      hasUserRating: RatingsOverview.prototype.hasUserRating,
      getUserRating: RatingsOverview.prototype.getUserRating,
      recalculateAverage: RatingsOverview.prototype.recalculateAverage
    };

    return overview;
  }

}
