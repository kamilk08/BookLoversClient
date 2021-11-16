import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { Author } from '../../../../api/authors/authors/models/author.model';
import { Quote } from 'src/app/modules/api/quotes/models/quote.model';

@Component({
  selector: 'author-quote-item',
  templateUrl: './author-quote-item.component.html',
  styleUrls: ['./author-quote-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorQuoteItemComponent implements OnInit {

  public maxQuoteText: number = 200;
  public expanded: boolean;

  @Input() quote: Quote
  @Input() author: Author


  constructor() { }

  ngOnInit() {
  }

  public sliceQuoteText(from: number, to: number) {
    if (this.quote)
      return this.quote.content.quoteText.slice(from, to);
  }

  public toggle() {
    this.expanded = !this.expanded;
  }

  public isTooLong() {
    return this.quote ? this.quote.content.quoteText.length > this.maxQuoteText : false;
  }
}
