import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { FavouriteAuthorImage } from './favourite-author-image.component'

describe('FavouriteAuthorImage', () => {
  let component: FavouriteAuthorImage;
  let fixture: ComponentFixture<FavouriteAuthorImage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FavouriteAuthorImage],
      imports: [SharedModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([])
      ]
    })
      .overrideComponent(FavouriteAuthorImage, { set: { changeDetection: ChangeDetectionStrategy.Default } })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouriteAuthorImage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('default author image box should be visible when imageLoadError$ emits true value', () => {

    component.imageLoadError$.next(true);

    fixture.detectChanges();

    const defaultBox = fixture.debugElement.query(By.css('.favourite-author-image__default'));

    expect(defaultBox).not.toBeNull();
  });

  it('img element should be visible when imageLoadError$ emits false value', () => {

    component.imageLoadError$.next(false);

    fixture.detectChanges();

    const imgElement = fixture.debugElement.query(By.css('.favourite-author-image__img'));

    expect(imgElement).not.toBeNull();

  });

});
