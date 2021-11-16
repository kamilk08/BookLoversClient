import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthorQuoteLikesComponent } from './author-quote-likes.component';

describe('AuthorQuoteLikesComponent', () => {
  let component: AuthorQuoteLikesComponent;
  let fixture: ComponentFixture<AuthorQuoteLikesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      declarations: [AuthorQuoteLikesComponent]
    })
      .overrideComponent(AuthorQuoteLikesComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorQuoteLikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When like button is triggered', () => {
    it('should render no heart icon when quote is not liked by a user', () => {

      let debugElement = fixture.debugElement.query(By.css('.quote-likes__like-icon'));
      let iconElement: HTMLElement = debugElement.nativeElement;

      expect(iconElement.classList.contains('ion-md-heart-empty')).toBeTruthy();

    });

    it('should render icon with heart when quote is liked by a user', () => {

      component.isLikedBy = true;
      fixture.detectChanges();

      let debugElement = fixture.debugElement.query(By.css('.quote-likes__like-icon'));
      let iconElement: HTMLElement = debugElement.nativeElement;

      expect(iconElement.classList.contains('ion-md-heart')).toBeTruthy();

    });
  })
});
