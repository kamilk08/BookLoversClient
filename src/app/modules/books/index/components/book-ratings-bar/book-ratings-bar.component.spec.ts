import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { BookRatingsBarComponent } from './book-ratings-bar.component';

describe('BookRatingsBarComponent', () => {
  let component: BookRatingsBarComponent;
  let fixture: ComponentFixture<BookRatingsBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([])
      ],
      declarations: [BookRatingsBarComponent]
    })
      .overrideComponent(BookRatingsBarComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookRatingsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getPercents should return proper value', () => {

    //(10 * 100)/25=40;

    component.allRatingsCount = 25;
    component.starRatingsCount = 10;

    fixture.detectChanges();

    const percetns = component.getPercents();

    expect(percetns).toEqual('40.00');

  })
});
