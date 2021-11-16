import { Component, OnInit, OnDestroy } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { NzModalRef } from 'ng-zorro-antd';
import { QuoteFrom } from 'src/app/modules/api/quotes/models/quote-from.model';
import { Quote } from 'src/app/modules/api/quotes/models/quote.model';
import { QuoteType } from 'src/app/modules/api/quotes/models/quote-type';
import { QuoteService } from 'src/app/modules/quotes/quote.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { updateFormValidity } from 'src/app/modules/shared/common/update-form-validity';
import { AddBookQuoteChange } from './events/add-book-quote-change.event';

@Component({
  selector: 'app-book-add-quote-dialog',
  templateUrl: './add-book-quote-dialog.component.html',
  styleUrls: ['./add-book-quote-dialog.component.scss']
})
export class AddBookQuoteDialogComponent implements OnInit, OnDestroy {

  public bookGuid: UUID;

  constructor(
    public readonly authService: AuthService,
    public readonly modal: NzModalRef,
    public readonly pageService: QuoteService) { }


  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.pageService.quoteForm.reset();
  }

  addQuote() {
    if (this.pageService.quoteForm.valid) {
      const quoteFrom = new QuoteFrom(this.bookGuid, QuoteType.bookQuote);
      const addedBy = { id: this.authService.userId, guid: this.authService.userGuid };
      let quote = new Quote(this.pageService.quoteContent, quoteFrom, addedBy);

      const event: AddBookQuoteChange = {
        quote,
        quoteAdded: true
      };

      this.modal.close(event);
    }
    else updateFormValidity(this.pageService.quoteForm);
  }

  cancel() {
    this.modal.close({ quoteAdded: false });
  }
}
