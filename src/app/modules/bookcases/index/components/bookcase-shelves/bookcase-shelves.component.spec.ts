import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookcaseShelvesComponent } from './bookcase-shelves.component';

describe('BookcaseShelvesComponent', () => {
  let component: BookcaseShelvesComponent;
  let fixture: ComponentFixture<BookcaseShelvesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookcaseShelvesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookcaseShelvesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
