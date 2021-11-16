import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BookDescriptionComponent } from './book-description.component';

describe('BookDescriptionComponent', () => {
  let component: BookDescriptionComponent;
  let fixture: ComponentFixture<BookDescriptionComponent>;
  let maxDescriptionCount = 10;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookDescriptionComponent]
    })
      .overrideComponent(BookDescriptionComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDescriptionComponent);
    component = fixture.componentInstance;
    component.maxDescriptionCount = maxDescriptionCount;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show full description when text is shorter than maxDescriptionCount', () => {

    let spy = spyOn(component, 'sliceDescription');

    const testDescription = 'abcdefg';

    component.description = testDescription;

    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(component.afterBigLetter, component.description.length);

  });

  it('should show shortened description when text is larget than maxDescriptionCount', () => {

    component.maxDescriptionCount = 5;

    let spy = spyOn(component, 'sliceDescription');

    const testDescription = 'abcdefg';

    component.description = testDescription;

    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(component.afterBigLetter, component.maxDescriptionCount);

  })
});
