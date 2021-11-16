import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UUID } from 'angular2-uuid';
import { Rating } from 'src/app/modules/api/ratings/models/rating.model';
import { RatingsOverview } from 'src/app/modules/api/ratings/models/ratings-overview.model';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { AuthorBookContentComponent } from './author-book-content.component';

describe('AuthorBookContentComponent', () => {
  let component: AuthorBookContentComponent;
  let fixture: ComponentFixture<AuthorBookContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, FormsModule, ReactiveFormsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([])
      ],
      declarations: [AuthorBookContentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorBookContentComponent);
    component = fixture.componentInstance;
    const userId = 2;

    const overview = new RatingsOverview({ bookId: 1, bookGuid: UUID.UUID() });
    overview.addRating(new Rating(1, userId, 5));
    overview.addRating(new Rating(1, userId, 4));

    component.overview = overview;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display average properly when ratings overview is provided', () => {

    const averageDebugElement = fixture.debugElement.queryAll(By.css('.author-book-content__value'));

    const averageElement: HTMLElement = averageDebugElement[0].nativeElement;

    expect(averageElement.textContent).toBe('4.50');
  });

  it('should display ratings count properly when overview is provided', () => {

    const debugElements = fixture.debugElement.queryAll(By.css('.author-book-content__value'));

    const ratingsElement: HTMLElement = debugElements[1].nativeElement;

    expect(ratingsElement.textContent).toBe('2');
  })

});
