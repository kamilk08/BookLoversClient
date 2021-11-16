import { Identification } from 'src/app/modules/shared/models/identification';
import { ReviewedBook } from './reviewed-book.model';
import { Like } from 'src/app/modules/shared/models/like';
import { ReviewContent } from './review-content.model';
import { UUID } from 'angular2-uuid';
import { ReviewedBy } from './reviewed-by.model';
import { SpoilerTag } from './spoiler-tag.model';
import { ReviewReport } from './review-report.model';

export class Review {
  public identification: Identification
  public reviewedBook: ReviewedBook
  public reviewedBy: ReviewedBy
  public reviewContent: ReviewContent;

  public likes: Like[];
  public spoilerTags: SpoilerTag[];
  public reportedByUsers: ReviewReport[];

  constructor(reviewContent: ReviewContent, reviewedBook: ReviewedBook, reviewedBy: ReviewedBy) {
    this.identification = { id: null, guid: UUID.UUID() }
    this.reviewedBook = reviewedBook;
    this.reviewContent = reviewContent;
    this.reviewedBy = reviewedBy;
    this.likes = [];
    this.spoilerTags = [];
    this.reportedByUsers = [];
  }

  changeReview(review: string, isSpoiler: boolean, editDate: Date) {
    this.reviewContent = new ReviewContent(review, this.reviewContent.reviewDate, isSpoiler, editDate);
  }

  likeReview(readerId: number) {
    this.likes.push({ id: undefined, readerId: readerId });
  }

  unlikeReview(readerId: number) {
    const like = this.likes.find(p => p.readerId === readerId);
    const index = this.likes.indexOf(like);
    this.likes.splice(index, 1);
  }

  addSpoilerTag(readerId: number) {
    this.spoilerTags.push(new SpoilerTag(readerId));
  }

  removeSpoilerTag(readerId: number) {
    const spoilerTag = this.spoilerTags.find(p => p.readerId === readerId);
    const index = this.spoilerTags.indexOf(spoilerTag);
    this.spoilerTags.splice(index, 1);
  }

  reportReview(readerId: number) {
    this.reportedByUsers.push(new ReviewReport(readerId));
  }

  removeReport(readerId: number) {
    const index = this.reportedByUsers.findIndex(p => p.readerId === readerId);
    return this.reportedByUsers.splice(index, 1);
  }

  hasReaderLike(readerId: number) {
    return this.likes.some(p => p.readerId === readerId);
  }

  hasSpoilerTag(readerId: number) {
    return this.spoilerTags.some(p => p.readerId === readerId);
  }

  hasBeenReportedBy(readerId: number) {
    return this.reportedByUsers.some(p => p.readerId === readerId);
  }
}
