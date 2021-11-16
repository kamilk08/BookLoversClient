import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UUID } from 'angular2-uuid';
import { NzSkeletonComponent } from 'ng-zorro-antd';
import { ReaderDetails } from 'src/app/modules/api/readers/models/reader-details.model';
import { Reader } from 'src/app/modules/api/readers/models/reader.model';
import { ReviewContent } from 'src/app/modules/api/reviews/models/review-content.model';
import { Review } from 'src/app/modules/api/reviews/models/review.model';
import { ReviewedBook } from 'src/app/modules/api/reviews/models/reviewed-book.model';
import { ReviewedBy } from 'src/app/modules/api/reviews/models/reviewed-by.model';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { BookCommentContentComponent } from './book-comment-content.component';

describe('BookCommentContentComponent', () => {
  let component: BookCommentContentComponent;
  let fixture: ComponentFixture<BookCommentContentComponent>;
  let review: Review
  let dateInString: string = '2014-12-12';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([])
      ],
      declarations: [BookCommentContentComponent]
    })
      .overrideComponent(BookCommentContentComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {

    review = new Review(new ReviewContent('review', new Date(dateInString), true),
      new ReviewedBook(1, UUID.UUID()),
      new ReviewedBy(1, UUID.UUID()))

    fixture = TestBed.createComponent(BookCommentContentComponent);
    component = fixture.componentInstance;
    component.reader = new Reader(new ReaderDetails('username', 'user', new Date()), 1);
    component.reader.identification.id = 1;
    component.review = review;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when review is provided then link to given reader should be visible', () => {

    const linkDebugElement = fixture.debugElement.query(By.css('.book-comment__username'));

    const linkElement: HTMLElement = linkDebugElement.nativeElement;

    const hrefAttribute = linkElement.getAttribute('href');

    expect(hrefAttribute).not.toEqual('');
    expect(linkElement.textContent).toEqual(component.reader.details.userName);
  });

  it('when review is provided, review date should be in valid format', () => {

    const reviewBoxDebugElement = fixture.debugElement.query(By.css('.book-comment__basics-right'));

    const reviewBoxElement: HTMLElement = reviewBoxDebugElement.nativeElement;

    expect(reviewBoxElement.textContent).toEqual(dateInString);

  });

  it('if review is not a spoiler, review text should be visible', () => {

    component.spoiler = false

    fixture.detectChanges();

    const reviewContentDebugElement = fixture.debugElement.query(By.css('.book-comment__content'));

    const reviewContentElement: HTMLElement = reviewContentDebugElement.nativeElement;
    expect(reviewContentElement.textContent).toEqual(review.reviewContent.reviewText);
  });

  it('if review is a spoiler nz-skeleton compontent should be visible', () => {

    component.spoiler = true;

    fixture.detectChanges();

    const skeletenDebugComponent = fixture.debugElement.query(By.directive(NzSkeletonComponent));

    expect(skeletenDebugComponent).not.toBeNull();
  });

  it('if spoilerFor flag is set to false, and spoiler equals true then showOrHide link shoulde be visible', () => {

    component.isSpoilerFor = false;
    component.spoiler = true;

    fixture.detectChanges();

    const showOrHideDebugElement = fixture.debugElement.query(By.css('.book-comment__show-review'));

    expect(showOrHideDebugElement).not.toBeNull();

  });

  it('when addOrRemoveLike method was invoked,toggleLike observable should emit value', () => {

    let spy = spyOn(component.toggleLike, 'emit');

    component.showActionsBar = true;

    fixture.detectChanges();

    const toggleLikeIconDebugElement = fixture.debugElement.query(By.css('.book-comment__action-icon--like-icon'));

    const toggleLikeElement: HTMLElement = toggleLikeIconDebugElement.nativeElement;

    toggleLikeElement.click();

    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('when addOrRemoveSpoiler method was invoked, toggleSpoiler observable should emit value', () => {

    let spy = spyOn(component.toggleSpoiler, 'emit');

    component.showActionsBar = true;

    fixture.detectChanges();

    const toggleSpoilerIconDebugElement = fixture.debugElement.query(By.css('.book-comment__action-icon--spoiler-icon'));

    const toggleSpoilerElement: HTMLElement = toggleSpoilerIconDebugElement.nativeElement;

    toggleSpoilerElement.click();

    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();

  });

  it('when report method was invoked reportReview observable should emit value', () => {

    let spy = spyOn(component.reportReview, 'emit');

    component.showActionsBar = true;

    fixture.detectChanges();

    const reportIconDebugElement = fixture.debugElement.query(By.css('.book-comment__action-icon--report-icon'));

    const reportElement: HTMLElement = reportIconDebugElement.nativeElement;

    reportElement.click();

    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();

  });

});
