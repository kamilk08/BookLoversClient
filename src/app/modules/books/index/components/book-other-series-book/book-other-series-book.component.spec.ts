import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { BookOtherSeriesBookComponent } from './book-other-series-book.component';

describe('BookOtherSeriesBookComponent', () => {
  let component: BookOtherSeriesBookComponent;
  let fixture: ComponentFixture<BookOtherSeriesBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterModule.forRoot([]),
      StoreModule.forRoot({}),
      EffectsModule.forRoot([])],
      declarations: [BookOtherSeriesBookComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookOtherSeriesBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
