import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FollowAuthorComponent } from './follow-author.component';

describe('FollowAuthorComponent', () => {
  let component: FollowAuthorComponent;
  let fixture: ComponentFixture<FollowAuthorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FollowAuthorComponent]
    })
      .overrideComponent(FollowAuthorComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('follow author element should have in-active class when followed is set to true', () => {

    component.followed = true;
    fixture.detectChanges();

    const debugElement = fixture.debugElement.query(By.css('.follow-author'));
    const followAuthorElement: HTMLElement = debugElement.nativeElement;

    expect(followAuthorElement.classList.contains('in-active')).toBeTruthy();
  });

  it('follow autor elemet should have additional class when followed is set to false', () => {

    component.followed = false;
    fixture.detectChanges();

    const debugElement = fixture.debugElement.query(By.css('.follow-author'));
    const followAuthorElement: HTMLElement = debugElement.nativeElement;

    expect(followAuthorElement.classList.contains('in-active')).toBeFalsy();
  });

});
