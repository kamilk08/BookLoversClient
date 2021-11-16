import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyAddedBookInfoComponent } from './recently-added-book-info.component';

describe('RecentlyAddedBookInfoComponent', () => {
  let component: RecentlyAddedBookInfoComponent;
  let fixture: ComponentFixture<RecentlyAddedBookInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentlyAddedBookInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentlyAddedBookInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
