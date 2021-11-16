import { UUID } from 'angular2-uuid';

export class ReportReview {
  public readonly reviewGuid: UUID;
  public readonly reportReasonId: number;

  constructor(reviewGuid: UUID, reportReasonId: number) {
    this.reviewGuid = reviewGuid;
    this.reportReasonId = reportReasonId;
  }
}
