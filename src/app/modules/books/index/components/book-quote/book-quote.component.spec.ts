import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BookQuoteComponent } from './book-quote.component';

describe('BookQuoteComponent', () => {
  let component: BookQuoteComponent;
  let fixture: ComponentFixture<BookQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookQuoteComponent]
    })
      .overrideComponent(BookQuoteComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('likeQuote should emit new value when toggleLike was invoked', () => {

    component.canBeLiked = true;

    fixture.detectChanges();

    let spy = spyOn(component.likeQuote, 'emit');

    const toggleLikeIconDebugElement = fixture.debugElement.query(By.css('.book-quote__like-icon'));

    const toggleLikeIconElement: HTMLElement = toggleLikeIconDebugElement.nativeElement;

    toggleLikeIconElement.click();

    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('like icon should have no-animate css class when likedBy flag is set to false', () => {

    component.canBeLiked = true;

    fixture.detectChanges();

    const toggleLikeIconDebugElement = fixture.debugElement.query(By.css('.book-quote__like-icon'));

    const toggleLikeIconElement: HTMLElement = toggleLikeIconDebugElement.nativeElement;

    toggleLikeIconElement.click();

    fixture.detectChanges();

    expect(toggleLikeIconElement.classList.contains('active')).toBeTruthy();

  });

  it('like icon should have no-animate css class when likedBy flag is set to true', () => {
    component.canBeLiked = true;

    fixture.detectChanges();

    const toggleLikeIconDebugElement = fixture.debugElement.query(By.css('.book-quote__like-icon'));

    const toggleLikeIconElement: HTMLElement = toggleLikeIconDebugElement.nativeElement;

    toggleLikeIconElement.click();
    toggleLikeIconElement.click();

    fixture.detectChanges();

    expect(toggleLikeIconElement.classList.contains('no-animate')).toBeTruthy();
  })
});
