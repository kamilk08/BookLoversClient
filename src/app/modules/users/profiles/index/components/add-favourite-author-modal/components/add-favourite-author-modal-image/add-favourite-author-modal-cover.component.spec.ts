import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { AddFavouriteAuthorModalCover } from './add-favourite-author-modal-cover.component';

describe('AddFavouriteAuthorModalCover', () => {
  let component: AddFavouriteAuthorModalCover;
  let fixture: ComponentFixture<AddFavouriteAuthorModalCover>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([])
      ],
      declarations: [AddFavouriteAuthorModalCover]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFavouriteAuthorModalCover);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('default cover should be visible when coverLoadError$ observable emited true value', () => {

    component.coverLoadError$.next(true);

    fixture.detectChanges();

    const defaultCoverBox = fixture.debugElement.query(By.css('.favourite__author-cover'));

    expect(defaultCoverBox).not.toBeNull();
  });

  it('img element should be visible when coverLoadError$ observable did not emited true value', () => {

    component.coverLoadError$.next(false);

    fixture.detectChanges();

    const profileImage = fixture.debugElement.query(By.css('.profile__img'));

    expect(profileImage).toBeDefined();

  });
});
