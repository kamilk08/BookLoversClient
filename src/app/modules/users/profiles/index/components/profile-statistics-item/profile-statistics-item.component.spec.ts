import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileStatisticsItemComponent } from './profile-statistics-item.component';

describe('ProfileStatisticsItemComponent', () => {
  let component: ProfileStatisticsItemComponent;
  let fixture: ComponentFixture<ProfileStatisticsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileStatisticsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileStatisticsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
