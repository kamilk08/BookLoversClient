import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { ToggleLike } from './events/toggle-like.event';
import { ToggleSpoiler } from './events/toggle-spoiler.event';
import { Rating } from 'src/app/modules/api/ratings/models/rating.model';
import { Reader } from 'src/app/modules/api/readers/models/reader.model';
import { Review } from 'src/app/modules/api/reviews/models/review.model';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'book-comment-content',
  templateUrl: './book-comment-content.component.html',
  styleUrls: ['./book-comment-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookCommentContentComponent implements OnInit, OnChanges, OnDestroy {

  @Input() reader: Reader
  @Input() review: Review;
  @Input() rating: Rating
  @Input() likedByUser: boolean
  @Input() markedAsSpoilerByReader: boolean
  @Input() markedAsSpoilerByOthers: boolean;
  @Input() isSpoilerFor: boolean;
  @Input() reportedByUser: boolean
  @Input() showActionsBar: boolean

  @Output() toggleLike: EventEmitter<ToggleLike> = new EventEmitter<ToggleLike>();
  @Output() toggleSpoiler: EventEmitter<ToggleSpoiler> = new EventEmitter<ToggleSpoiler>();
  @Output() reportReview: EventEmitter<any> = new EventEmitter<any>();

  public liked: boolean;
  public spoiler: boolean;
  public reported: boolean;

  constructor() { }

  ngOnDestroy(): void {
  }

  ngOnInit() {
  }

  ngOnChanges(): void {
    this.liked = this.likedByUser;
    this.spoiler = this.markedAsSpoilerByReader || this.markedAsSpoilerByOthers || this.isSpoilerFor;
    this.reported = this.reportedByUser;
  }


  addOrRemoveLike() {
    if (this.reported)
      return;

    this.liked = !this.liked;
    this.toggleLike.emit({ review: this.review, liked: this.liked });
  }

  addOrRemoveSpoiler() {
    if (this.reported)
      return;

    this.spoiler = !this.spoiler;
    if (this.isSpoilerFor)
      this.toggleSpoiler.emit({ review: this.review, spoiler: false });
    else this.toggleSpoiler.emit({ review: this.review, spoiler: true })
  }

  report() {
    this.reported = true;
    this.liked = false;
    this.spoiler = false;
    this.reportReview.emit({ review: this.review, reported: this.reported });
  }

  isSpoiler() {
    return this.spoiler;
  }

  showOrHideReview() {
    this.spoiler = !this.spoiler;
  }

}
