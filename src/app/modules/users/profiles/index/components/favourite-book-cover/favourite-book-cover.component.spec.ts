import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { FavouriteBookCover } from './favourite-book-cover.component';

describe('FavouriteBookCover', () => {
  let component: FavouriteBookCover;
  let fixture: ComponentFixture<FavouriteBookCover>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([])
      ],
      declarations: [FavouriteBookCover]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouriteBookCover);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('default book cover box should be visible when coverLoadError$ emits true value', () => {

    component.coverLoadError$.next(true);

    fixture.detectChanges();

    const defaultBox = fixture.debugElement.query(By.css('.favourite-book-cover__default'));

    expect(defaultBox).not.toBeNull();
  });

  it('img element should be visible when coverLoadError$ emits false value', () => {

    component.coverLoadError$.next(false);

    fixture.detectChanges();

    const imgElement = fixture.debugElement.query(By.css('.favourite-book-cover__img'));

    expect(imgElement).not.toBeNull();

  });
});
