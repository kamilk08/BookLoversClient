import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { TimelineItemDetailsService } from '../../../services/timeline-item-details.service';
import { BookReviewTimeLineItemComponent } from '../book-review-timeline-item.component';
import { BookReviewTimeLineItemDetailsComponent } from './book-review-timeline-item-details.component';


describe('BookReviewTimeLineItemDetailsComponent', () => {
  let component: BookReviewTimeLineItemDetailsComponent;
  let fixture: ComponentFixture<BookReviewTimeLineItemDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, FormsModule, ReactiveFormsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([])
      ],
      providers:[TimelineItemDetailsService],
      declarations: [BookReviewTimeLineItemDetailsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookReviewTimeLineItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
