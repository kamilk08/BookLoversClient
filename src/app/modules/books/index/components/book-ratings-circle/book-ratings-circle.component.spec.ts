import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { BookRatingsCircleComponent } from './book-ratings-circle.component';

describe('BookRatingsCircleComponent', () => {
  let component: BookRatingsCircleComponent;
  let fixture: ComponentFixture<BookRatingsCircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([])
      ],
      declarations: [BookRatingsCircleComponent]
    })
      .overrideComponent(BookRatingsCircleComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookRatingsCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('toPercents', () => {

    component.average = 4.76;

    fixture.detectChanges();

    //(average*100)/5 where 5 is maximium star legs;
    const expectedCirlcePerecents = 95.2;

    component.toPercents()

    expect(component.percents).toBe(expectedCirlcePerecents);
  })

});
