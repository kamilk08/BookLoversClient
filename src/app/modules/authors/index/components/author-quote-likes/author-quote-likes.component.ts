import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { QuoteLikeEvent } from 'src/app/modules/books/index/components';
import { Quote } from 'src/app/modules/api/quotes/models/quote.model';

@Component({
  selector: 'author-quote-likes',
  templateUrl: './author-quote-likes.component.html',
  styleUrls: ['./author-quote-likes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorQuoteLikesComponent implements OnInit {

  @Input() quote: Quote;
  @Input() isLikedBy: boolean;
  @Output() quoteLike: EventEmitter<QuoteLikeEvent> = new EventEmitter<QuoteLikeEvent>();

  constructor() { }

  ngOnInit() {
  }

  toggleLike() {
    this.isLikedBy = !this.isLikedBy;
    this.quoteLike.emit({ quote: this.quote, isLiked: this.isLikedBy })
  }
}
