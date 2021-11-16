import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookOnShelfComponent } from './book-on-shelf.component';

describe('BookOnShelfComponent', () => {
  let component: BookOnShelfComponent;
  let fixture: ComponentFixture<BookOnShelfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookOnShelfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookOnShelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
