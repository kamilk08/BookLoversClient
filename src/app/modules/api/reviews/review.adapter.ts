import { Injectable } from '@angular/core';
import { Adapter } from 'src/app/modules/shared/adapter';
import { Like } from 'src/app/modules/shared/models/like';
import { ReviewReport } from './models/review-report.model';
import { Review } from './models/review.model';
import { SpoilerTag } from './models/spoiler-tag.model';

@Injectable()
export class ReviewAdapter implements Adapter<Review> {
  adapt(item: any): Review {

    if (!item)
      return undefined;

    let review: Review = {
      identification: {
        id: item.id,
        guid: item.guid
      },
      reviewedBook: {
        bookGuid: item.bookGuid,
        bookId: item.bookId
      },
      reviewContent: {
        reviewText: item.review,
        reviewDate: item.reviewDate,
        editedDate: item.editedDate,
        markedAsSpoiler: item.markedAsSpoiler,
        markedAsSpoilerByOthers: item.markedAsSpoilerByOthers
      },
      reviewedBy: {
        userId: item.readerId,
        guid: item.readerGuid
      },
      likes: this.adaptReviewLikes(item),
      spoilerTags: this.adaptSpoilerTags(item),
      reportedByUsers: this.adaptReviewReports(item),
      changeReview: Review.prototype.changeReview,
      likeReview: Review.prototype.likeReview,
      unlikeReview: Review.prototype.unlikeReview,
      addSpoilerTag: Review.prototype.addSpoilerTag,
      removeSpoilerTag: Review.prototype.removeSpoilerTag,
      hasReaderLike: Review.prototype.hasReaderLike,
      hasSpoilerTag: Review.prototype.hasSpoilerTag,
      hasBeenReportedBy: Review.prototype.hasBeenReportedBy,
      reportReview: Review.prototype.reportReview,
      removeReport: Review.prototype.removeReport
    };

    return review;
  }

  private adaptReviewLikes(item: any) {
    return Array.from(item.likes).map(item => item as Like);
  }

  private adaptSpoilerTags(item: any) {
    return Array.from(item.spoilerTags).map(item => item as SpoilerTag);
  }

  private adaptReviewReports(item: any) {
    return Array.from(item.reviewReports).map(item => item as ReviewReport);
  }
}
