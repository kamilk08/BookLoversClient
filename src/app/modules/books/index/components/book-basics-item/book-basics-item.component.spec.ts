import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookBasicsItemComponent } from './book-basics-item.component';

describe('BookBasicsItemComponent', () => {
  let component: BookBasicsItemComponent;
  let fixture: ComponentFixture<BookBasicsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookBasicsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookBasicsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
