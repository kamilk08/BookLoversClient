import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartFollowingReaderComponent } from './start-following-reader.component';

describe('StartFollowingReaderComponent', () => {
  let component: StartFollowingReaderComponent;
  let fixture: ComponentFixture<StartFollowingReaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartFollowingReaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartFollowingReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
