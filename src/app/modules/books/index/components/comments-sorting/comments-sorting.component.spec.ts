import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsSortingComponent } from './comments-sorting.component';

describe('CommentsSortingComponent', () => {
  let component: CommentsSortingComponent;
  let fixture: ComponentFixture<CommentsSortingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentsSortingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsSortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
