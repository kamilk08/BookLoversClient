import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewBookcaseShelfComponent } from './preview-bookcase-shelf.component';

describe('PreviewBookcaseShelfComponent', () => {
  let component: PreviewBookcaseShelfComponent;
  let fixture: ComponentFixture<PreviewBookcaseShelfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewBookcaseShelfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewBookcaseShelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
