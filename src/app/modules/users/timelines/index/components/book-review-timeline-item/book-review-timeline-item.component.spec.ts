import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NzAvatarComponent, NzRateModule } from 'ng-zorro-antd';
import { ReaderDetails } from 'src/app/modules/api/readers/models/reader-details.model';
import { Reader } from 'src/app/modules/api/readers/models/reader.model';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { BookReviewTimeLineItemComponent } from './book-review-timeline-item.component';

describe('BookReviewTimeLineItemComponent', () => {
  let component: BookReviewTimeLineItemComponent;
  let fixture: ComponentFixture<BookReviewTimeLineItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([])
      ],
      declarations: [BookReviewTimeLineItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookReviewTimeLineItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('NAVIGATE_TO_READER', () => {
    it('when user clicks avatar then moveToReader observable should emit new value', () => {

      let spy = spyOn(component.moveToReader, 'emit');

      const reader = new Reader(new ReaderDetails('username', 'role', new Date()), 1);
      reader.identification.id = 1;

      component.reader = reader;

      fixture.detectChanges();

      const avatarComponent = fixture.debugElement.query(By.directive(NzAvatarComponent));

      avatarComponent.triggerEventHandler('click', {});

      expect(spy).toHaveBeenCalled();
    });
  });
});
