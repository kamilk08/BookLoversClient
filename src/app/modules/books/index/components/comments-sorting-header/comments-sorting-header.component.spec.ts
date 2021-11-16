import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsSortingHeaderComponent } from './comments-sorting-header.component';

describe('CommentsSortingHeaderComponent', () => {
  let component: CommentsSortingHeaderComponent;
  let fixture: ComponentFixture<CommentsSortingHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentsSortingHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsSortingHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
