import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { Statistics } from 'src/app/modules/api/ratings/statistics/models/statistics';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { AuthorSeriesContentComponent } from './author-series-content.component';

describe('AuthorSeriesContentComponent', () => {
  let component: AuthorSeriesContentComponent;
  let fixture: ComponentFixture<AuthorSeriesContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, FormsModule, ReactiveFormsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([])
      ],
      declarations: [AuthorSeriesContentComponent]
    })
    .overrideComponent(AuthorSeriesContentComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorSeriesContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display average properly when statistics are provided', () => {

    let statistics: Statistics = {
      objectId: 1,
      ratingsCount: 2,
      average: 4.55
    };

    component.seriesStatistics = statistics;
    fixture.detectChanges();

    const averageDebugElement = fixture.debugElement.queryAll(By.css('.author-series-statistics__value'));

    const averageElement: HTMLElement = averageDebugElement[0].nativeElement;

    expect(averageElement.textContent).toBe('4.55');
  });

  it('should display ratings count properly when statistcs are provided', () => {

    let statistics: Statistics = {
      objectId: 1,
      ratingsCount: 2,
      average: 4.55
    };

    component.seriesStatistics = statistics;
    fixture.detectChanges();

    const debugElements = fixture.debugElement.queryAll(By.css('.author-series-statistics__value'));

    const ratingsElement: HTMLElement = debugElements[1].nativeElement;

    expect(ratingsElement.textContent).toBe('2');
  })
});
