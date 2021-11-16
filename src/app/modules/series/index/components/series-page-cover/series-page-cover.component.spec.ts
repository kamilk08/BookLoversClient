import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { SeriesPageCoverComponent } from './series-page-cover.component';

describe('SeriesPageCoverComponent', () => {
  let component: SeriesPageCoverComponent;
  let fixture: ComponentFixture<SeriesPageCoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([]),
      ],
      declarations: [SeriesPageCoverComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesPageCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('COVER_BOX', () => {
    it('should be visible when coverLoadError$ emits true value', () => {

      component.coverLoadError$.next(true);

      fixture.detectChanges();

      const coverBoxElement = fixture.debugElement.query(By.css('.cover__box'));

      expect(coverBoxElement).not.toBeNull();
    });

    it('img element should be visible when coverLoadError$ does not emit true value', () => {

      const coverBoxElement = fixture.debugElement.query(By.css('.cover__image'));

      expect(coverBoxElement).not.toBeNull();
    })
  });
});
