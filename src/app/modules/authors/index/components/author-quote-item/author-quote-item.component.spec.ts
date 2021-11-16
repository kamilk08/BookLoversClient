import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { QuoteContent } from 'src/app/modules/api/quotes/models/quote-content.model';
import { Quote } from 'src/app/modules/api/quotes/models/quote.model';

import { AuthorQuoteItemComponent } from './author-quote-item.component';

describe('AuthorQuoteItemComponent', () => {
  let component: AuthorQuoteItemComponent;
  let fixture: ComponentFixture<AuthorQuoteItemComponent>;

  let quote = new Quote('quote', undefined, undefined);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorQuoteItemComponent]
    })
      .overrideComponent(AuthorQuoteItemComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorQuoteItemComponent);
    component = fixture.componentInstance;
    component.quote = quote;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('when quote is too long', () => {
    it('quote should be shorter than is orignal quote', () => {

      component.maxQuoteText = 1;
      const newQuote = component.sliceQuoteText(0, component.maxQuoteText);
      component.quote = new Quote(newQuote, undefined, undefined);

      fixture.detectChanges();

      const debugElement = fixture.debugElement.query(By.css('.author-quote-item__quote'));
      const quoteElement: HTMLElement = debugElement.nativeElement;

      expect(quoteElement.textContent).toEqual(newQuote);
    });
  });

  describe('when quote is not too long', () => {
    it('content of the box should be equal to quote text', () => {

      const debugElement = fixture.debugElement.query(By.css('.author-quote-item__quote'));
      const quoteElement: HTMLElement = debugElement.nativeElement;

      expect(quoteElement.textContent).toEqual(quote.content.quoteText);
    });
  })
});
