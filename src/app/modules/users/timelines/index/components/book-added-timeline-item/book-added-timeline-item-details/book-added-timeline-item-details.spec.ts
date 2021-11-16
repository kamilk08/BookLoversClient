import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { TimelineItemDetailsService } from '../../../services/timeline-item-details.service';
import { BookAddedTimeLineItemDetailsComponent } from './book-added-timeline-item-details.component';


describe('BookAddedTimeLineItemDetailsComponent', () => {
  let component: BookAddedTimeLineItemDetailsComponent;
  let fixture: ComponentFixture<BookAddedTimeLineItemDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, FormsModule, ReactiveFormsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([])],
      declarations: [BookAddedTimeLineItemDetailsComponent],
      providers: [TimelineItemDetailsService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookAddedTimeLineItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
