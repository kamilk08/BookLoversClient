import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { QuoteService } from 'src/app/modules/quotes/quote.service';
import { updateFormValidity } from 'src/app/modules/shared/common/update-form-validity';
import { Author } from '../../../../api/authors/authors/models/author.model';
import { AddAuthorQuoteChange } from './events/add-author-quote-change.event';

@Component({
  selector: 'app-add-author-quote',
  templateUrl: './add-author-quote.component.html',
  styleUrls: ['./add-author-quote.component.scss']
})
export class AddAuthorQuoteComponent implements OnInit, OnDestroy {

  public author: Author

  constructor(
    private readonly modalRef: NzModalRef,
    public readonly pageService: QuoteService) { }


  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.pageService.quoteForm.reset();
    this.modalRef.destroy();
  }

  addQuote() {
    if (this.pageService.quoteForm.valid) {
      this.addQuoteInternal();
    }
    else updateFormValidity(this.pageService.quoteForm);
  }

  cancel() {
    const event: AddAuthorQuoteChange = {
      quote: undefined,
      isConfirmed: false
    }
    this.modalRef.destroy(event);
  }

  private addQuoteInternal() {
    const quote = this.pageService.createAuthorQuote(this.author);
    const event: AddAuthorQuoteChange = {
      quote: quote,
      isConfirmed: true
    };
    this.modalRef.destroy(event);
  }

  @HostListener('document:keydown.enter', []) onEnterPress() {
    if (this.pageService.quoteForm.valid)
      this.addQuoteInternal();
    else updateFormValidity(this.pageService.quoteForm)
  }

}
