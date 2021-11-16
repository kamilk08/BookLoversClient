import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NzAvatarModule } from 'ng-zorro-antd';

import { BookCommentAvatarComponent } from './book-comment-avatar.component';

describe('BookCommentAvatarComponent', () => {
  let component: BookCommentAvatarComponent;
  let fixture: ComponentFixture<BookCommentAvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NzAvatarModule],
      declarations: [BookCommentAvatarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCommentAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
