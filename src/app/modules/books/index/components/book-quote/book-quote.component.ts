import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { QuoteLikeEvent } from '../../../../shared/models/quote-like.event';
import { Quote } from 'src/app/modules/api/quotes/models/quote.model';

@Component({
  selector: 'book-quote',
  templateUrl: './book-quote.component.html',
  styleUrls: ['./book-quote.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookQuoteComponent implements OnInit {

  @Input() quote: Quote
  @Input() isLikedBy: boolean;
  @Input() canBeLiked: boolean;

  constructor() { }

  @Output() likeQuote: EventEmitter<QuoteLikeEvent> = new EventEmitter<QuoteLikeEvent>();

  ngOnInit() {
  }


  toggleLike() {
    this.isLikedBy = !this.isLikedBy;
    this.likeQuote.emit({
      isLiked: this.isLikedBy,
      quote: this.quote
    });
  }
}
