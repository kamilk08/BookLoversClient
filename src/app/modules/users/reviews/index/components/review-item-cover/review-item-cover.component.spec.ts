import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DotComponent } from 'src/app/modules/shared/components/dot/dot.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { ReviewItemCoverComponent } from './review-item-cover.component';

describe('ReviewItemCoverComponent', () => {
  let component: ReviewItemCoverComponent;
  let fixture: ComponentFixture<ReviewItemCoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, FormsModule, ReactiveFormsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([])
      ],
      declarations: [ReviewItemCoverComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewItemCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('empty cover box should be visible when imageLoadError$ observable emits true value', () => {

    component.imageLoadError$.next(true);

    fixture.detectChanges();

    const emptyCoverBox = fixture.debugElement.query(By.css('.cover__empty'));

    expect(emptyCoverBox).not.toBeNull();

  })

  it('when there was no error while cover was loading then img element should be visible', () => {

    const imgElement = fixture.debugElement.query(By.css('.cover'));

    expect(imgElement).not.toBeNull();

  });
});
