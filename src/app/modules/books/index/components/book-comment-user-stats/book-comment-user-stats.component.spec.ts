import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCommentUserStatsComponent } from './book-comment-user-stats.component';

describe('BookCommentUserStatsComponent', () => {
  let component: BookCommentUserStatsComponent;
  let fixture: ComponentFixture<BookCommentUserStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookCommentUserStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCommentUserStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
