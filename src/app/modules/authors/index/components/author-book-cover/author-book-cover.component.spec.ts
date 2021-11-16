import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { AuthorBookCoverComponent } from './author-book-cover.component';

describe('AuthorBookCoverComponent', () => {
  let component: AuthorBookCoverComponent;
  let fixture: ComponentFixture<AuthorBookCoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([]),
      ],
      declarations: [AuthorBookCoverComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorBookCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when bookId is not provided should show default cover box', () => {

    component.bookId = undefined;
    fixture.detectChanges();

    const debugElement = fixture.debugElement.query(By.css('.author-book-cover'));
    const coverBoxElement: HTMLElement = debugElement.nativeElement;

    expect(coverBoxElement).toBeDefined();
  });

  it('when cover error is present should show default cover box', () => {

    component.bookId = 1;
    component.coverLoadError$.next(true);

    fixture.detectChanges();

    const debugElement = fixture.debugElement.query(By.css('.cover__no-cover-text'));
    const coverBoxElement: HTMLElement = debugElement.nativeElement;

    expect(coverBoxElement).toBeDefined();
  });

  it('when there is no error and bookId is provided should show img element with cover', () => {
    component.bookId = 1;
    component.coverLoadError$.next(false);

    fixture.detectChanges();

    const debugElement = fixture.debugElement.query(By.css('.cover__image'));
    const imgElement: HTMLElement = debugElement.nativeElement;

    expect(imgElement).toBeDefined();
  })
});
