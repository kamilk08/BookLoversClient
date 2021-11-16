import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { QuoteLikeEvent } from 'src/app/modules/books/index/components';
import { Quote } from 'src/app/modules/api/quotes/models/quote.model';

@Component({
  selector: 'quote-item-likes',
  templateUrl: './quote-item-likes.component.html',
  styleUrls: ['./quote-item-likes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuoteItemLikesComponent implements OnInit {

  @Input() quote: Quote;
  @Input() isLikedBy: boolean;
  @Input() canBeLiked: boolean;
  @Output() quoteLike: EventEmitter<QuoteLikeEvent> = new EventEmitter<QuoteLikeEvent>();

  constructor() { }

  ngOnInit() {
  }

  toggleLike() {
    this.isLikedBy = !this.isLikedBy;
    this.quoteLike.emit({ quote: this.quote, isLiked: this.isLikedBy })
  }
}
