import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StopFollowingReaderComponent } from './stop-following-reader.component';

describe('StopFollowingReaderComponent', () => {
  let component: StopFollowingReaderComponent;
  let fixture: ComponentFixture<StopFollowingReaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StopFollowingReaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StopFollowingReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
